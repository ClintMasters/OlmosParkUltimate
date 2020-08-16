import express from "express";
import { Controller } from "../Models/UltimateModels";
import { Op } from "sequelize";
import { db } from "../Domain/db";
const Game = db.games;

class GamesController extends Controller {
  constructor() {
    super("/games");
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path + "/all", this.gamesGetAll);
    this.router.post(this.path + "/create", this.createGame);
    this.router.delete(this.path + "/deleteAll", this.deleteAllGames);
  }

  gamesGetAll = async (
    request: express.Request,
    response: express.Response
  ) => {
    const name = request.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    Game.findAll()
      .then((data:any) => {
        response.send(data);
      })
      .catch((err:any) => {
        response.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  };

  createGame = async (
    request: express.Request,
    response: express.Response
  ) => {
    if (!request.body.name) {
      response.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    // Create a Game
    const game = {
      name: request.body.name,
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

  deleteAllGames = async (
    req: express.Request,
    res: express.Response
  ) => {
    Game.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Games were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all games."
        });
      });
  }
}

export default GamesController;
