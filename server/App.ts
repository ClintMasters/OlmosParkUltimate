import * as express from "express";
import * as bodyParser from "body-parser";
// Import middleware
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { Controller } from "server/Models/UltimateModels";
import {db} from './Domain/db';
class App {
  public app: express.Application;
  public port: number;

  constructor(app: express.Express, controllers : Controller[], port : number) {
    this.app = app;
    this.port = port;

    if (process.env.NODE_ENV && process.env.NODE_ENV !== "development") {
      this.app.get("*", (req, res) => {
        res.sendFile("build/index.html", { root: __dirname });
      });
    }

    this.initializeMiddlewares();
    this.initializeDb();
    this.initializeControllers(controllers);
    this.initializeErrors();
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(bodyParser.json());

  }

  private initializeDb() {
    db.sequelize.sync({ force: true }).then(() => {
      console.log("Drop and re-sync db.");
    });
  }

  private initializeControllers(controllers : Controller[]) {
    controllers.forEach((controller : Controller) => {
      this.app.use("/", controller.router);
    });
  }

  private initializeErrors() {
    this.app.use((err : any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error(err.stack);
      res.status(500).send("Something broke!");
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
