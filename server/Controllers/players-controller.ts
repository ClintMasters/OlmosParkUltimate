import { fakePlayers } from "../Models/UltimateModels";

import express from "express";
import { Controller } from "../Models/UltimateModels";
import { Op } from "sequelize";
import { db } from "../Domain/db";
const Player = db.players;

class PlayersController extends Controller {
  constructor() {
    super("/players");
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path + "/all", this.playersGetAll);
    this.router.post(this.path + "/create", this.createPlayer);
    this.router.delete(this.path + "/deleteAll", this.deleteAllPlayers);
  }

  playersGetAll = async (
    request: express.Request,
    response: express.Response
  ) => {
    const name = request.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    Player.findAll()
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

  createPlayer = async (
    request: express.Request,
    response: express.Response
  ) => {
    if (!request.body.name) {
      response.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    // Create a Player
    const player = {
      name: request.body.name,
    };

    // Save Player in the database
    Player.create(player)
      .then((data) => {
        response.send(data);
      })
      .catch((err) => {
        response.status(500).send({
          message:
            err.message || "Some error occurred while creating the Player.",
        });
      });
  };

  deleteAllPlayers = async (
    req: express.Request,
    res: express.Response
  ) => {
    Player.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Players were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all players."
        });
      });
  }
}

export default PlayersController;
