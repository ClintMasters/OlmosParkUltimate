// Import express framework
import express from 'express';
// Import routes
import App from './App';
import HomeController from './Controllers/home-controller';
import PlayersController from './Controllers/players-controller';
// Setup default port
const PORT = parseInt(process.env.PORT || "4000");

// Create express app
const app = new App(express(),
  [
    new HomeController(),
    new PlayersController()
  ],
  PORT,
);

app.listen();

