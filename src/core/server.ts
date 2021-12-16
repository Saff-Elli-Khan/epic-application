import {
  HTTP,
  EpicApplication,
  Request,
  Response,
  CreateResponse,
} from "@saffellikhan/epic-express";
import { Middlewares } from "./middlewares";
import { ValidatorException } from "epic-validator";
import { EpicTokensVerificationException } from "epic-tokens";
import { ConnectionManager } from "@saffellikhan/epic-orm";
import { ConfigManager } from "@saffellikhan/epic-cli";
import { ModelList } from "./models";

// Create Application
export class Application extends EpicApplication {
  _beforeInit = () => Middlewares(this.Framework);
  _onRouteError = (err: any, _: Request, res: Response) => {
    if (res.statusCode === 200) {
      // Request Validation Error
      if (err instanceof ValidatorException) res.status(400);
      // Authorization Failed
      else if (err instanceof EpicTokensVerificationException) res.status(403);
      // Page Not Found
      else if (err?.message === "Not Found") res.status(404);
      // Unknown Error
      else res.status(500);
    }

    // Return Response Object
    return new CreateResponse(
      err instanceof ValidatorException ? err.List : err.message || err,
      process.env.NODE_ENV === "development" ? err.stack : {}
    ).isFalse();
  };
}

// Get Connection Details
const Configuration = ConfigManager.getConfig("main");

// Create a Database Connection
new ConnectionManager(
  {
    host: Configuration.database.host,
    port: Configuration.database.port,
    user: Configuration.database.user,
    password: Configuration.database.password,
    database: Configuration.database.dbname,
    connectionLimit: Configuration.database.limit,
    logs: process.env.NODE_ENV === "development",
    sync: process.env.NODE_ENV === "development",
  },
  ModelList
)
  .init()
  .then(() =>
    // Start Application Server
    new HTTP(
      new Application({
        postman: Configuration.other.postman,
      })
    ).listen(process.env.PORT || 8080)
  );
