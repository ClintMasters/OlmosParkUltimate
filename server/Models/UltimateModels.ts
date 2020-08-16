import express from 'express';

export interface Player {
  id: string;
  name: string;
}

export class Controller {
    constructor(path: string) {
        this.router = express.Router();
        this.path = path;
    }

    path: string;
    router: any; 
}

export const fakePlayers = [
  {
    name: "Leanne Graham",
  },
  {
    name: "Ervin Howell",
  },
  {
    name: "Clementine Bauch",
  },
  {
    name: "Patricia Lebsack",
  },
  {
    name: "Chelsey Dietrich",
  },
] as Player[];
