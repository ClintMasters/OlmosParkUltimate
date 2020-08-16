import { connectionString } from "../Models/Settings";
import { Sequelize } from "sequelize";
import { Player, Game } from "./DomainModels";
const sequelize = new Sequelize("d2aoatolnv9vod", "liyixeqjnqtodv", "4f8e8dea69e613dd29021c82254d4815b3fd0ce9a2ebba6b9fc5a00b3e90bfe3",
{
  host:"ec2-184-73-249-9.compute-1.amazonaws.com",
  ssl: true,
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

export const db = {
  sequelize: sequelize,
  players: Player(sequelize),
  games: Game(sequelize)
};
