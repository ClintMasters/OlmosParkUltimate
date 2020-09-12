import express from "express";

export interface Player {
  id: string;
  name: string;
}

export class Option {
  constructor(value: string, label: string) {
    this.label = label;
    this.value = value;
  }
  value: string;
  label: string;
}

export interface Game {
  id: string;
  date: Date;
  order: number;
}

export interface GamePlayer {
  gameId: string;
  playerId: string;
  win: boolean;
}

export class Controller {
  constructor(path: string) {
    this.router = express.Router();
    this.path = path;
  }

  path: string;
  router: any;
}
