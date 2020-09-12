import { dbHost, dbName, dbPassword, dbUsername } from "../Models/Settings";
import { Sequelize } from "sequelize";
import { Player, Game, GamePlayer } from "./DomainModels";
const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  ssl: true,
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const players = Player(sequelize);
const games = Game(sequelize);
const gameplayers = GamePlayer(sequelize);

players.hasMany(gameplayers, { as: "gameplayers" });
gameplayers.belongsTo(players, {
  foreignKey: "playerId",
  as: "player",
});

games.hasMany(gameplayers, { as: "gameplayers" });
gameplayers.belongsTo(games, {
  foreignKey: "gameId",
  as: "game",
});

export const db = {
  sequelize: sequelize,
  players: players,
  games: games,
  gameplayer: gameplayers,
};
