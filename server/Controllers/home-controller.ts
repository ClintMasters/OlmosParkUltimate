import express from "express";
import { Controller } from "../Models/UltimateModels";

class HomeController extends Controller{
  constructor(){
    super("/api");
    this.initializeRoutes();
  }

  public initializeRoutes(){
    this.router.get(this.path, this.homeGet);
  }

  homeGet = async (request: express.Request, response: express.Response) => {
    response.send("Welcome Back Commander");
  }  
}

export default HomeController;