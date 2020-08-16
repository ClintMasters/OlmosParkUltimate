import {Sequelize, DataTypes} from 'sequelize';

export const Player = (sequelize : Sequelize) => {
    const Player = sequelize.define("player", {
        name: {
            type: DataTypes.STRING
        }
    })

    return Player;
}

export const Game = (sequelize : Sequelize) => {
  const Game = sequelize.define("game", {
      date: {
          type: DataTypes.DATE
      }
  })

  return Game;
}