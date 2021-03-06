import express from "express";
import { Op } from "sequelize";
import { db } from "../Domain/db";
import { Controller } from "../Models/UltimateModels";
const Game = db.games;

class GamesController extends Controller {
  constructor() {
    super("/games");
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path + "/all", this.gamesGetAll);
    this.router.get(this.path + "/findGames", this.findGames);
    this.router.post(this.path + "/create", this.createGame);
    this.router.delete(this.path + "/deleteAll", this.deleteAllGames);
  }

  findGames = async (request: express.Request, response: express.Response) => {
    const date = request.query.date;
    console.log("DATE: ", date);
    Game.findAll({ where: { date: date } })
      .then((data: any) => {
        response.send(data);
      })
      .catch((err: any) => {
        response.status(500).send({
          message: err.message || "Some error occurred while retrieving games.",
        });
      });
  };

  gamesGetAll = async (
    request: express.Request,
    response: express.Response
  ) => {
    const date = request.query.date;
    var condition = date ? { date: {} } : null;

    Game.findAll()
      .then((data: any) => {
        response.send(data);
      })
      .catch((err: any) => {
        response.status(500).send({
          message: err.message || "Some error occurred while retrieving games.",
        });
      });
  };

  createGame = async (request: express.Request, response: express.Response) => {
    if (!request.body.date) {
      response.status(400).send({
        message: "Date can not be empty!",
      });
      return;
    }

    // Create a Game
    const game = {
      date: request.body.date,
      order: request.body.order,
    };

    // Save Game in the database
    Game.create(game)
      .then((data) => {
        response.send(data);
      })
      .catch((err) => {
        response.status(500).send({
          message:
            err.message || "Some error occurred while creating the Game.",
        });
      });
  };

  deleteAllGames = async (req: express.Request, res: express.Response) => {
    Game.destroy({
      where: {},
      truncate: false,
    })
      .then((nums) => {
        res.send({ message: `${nums} Games were deleted successfully!` });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all games.",
        });
      });
  };
}

export default GamesController;
