import express from "express";
import { Op } from "sequelize";
import { db } from "../Domain/db";
import { Controller } from "../Models/UltimateModels";
const GamePlayer = db.gameplayer;

class GamesController extends Controller {
  constructor() {
    super("/gameplayers");
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path + "/all", this.getAllGamePlayers);
    this.router.post(this.path + "/create", this.createGamePlayer);
    this.router.delete(this.path + "/deleteAll", this.deleteAllGamePlayers);
  }

  getAllGamePlayers = async (
    request: express.Request,
    response: express.Response
  ) => {
    const name = request.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    GamePlayer.findAll()
      .then((data: any) => {
        response.send(data);
      })
      .catch((err: any) => {
        response.status(500).send({
          message: err.message || "Some error occurred while retrieving games.",
        });
      });
  };

  createGamePlayer = async (
    request: express.Request,
    response: express.Response
  ) => {
    if (!request.body.gameId) {
      response.status(400).send({
        message: "Game Id can not be empty!",
      });
      return;
    }

    // Create a Game
    const gamePlayer = {
      date: request.body.date,
      order: request.body.order,
    };

    // Save Game in the database
    GamePlayer.create(gamePlayer)
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

  deleteAllGamePlayers = async (
    req: express.Request,
    res: express.Response
  ) => {
    GamePlayer.destroy({
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
