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
import { InitializeCronJobs } from "./jobs";
import { ModelList } from "./models";
import { Configuration } from "./globals";

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
      process.env.NODE_ENV === "development" ? { stack: err.stack || err } : {}
    ).isFalse();
  };
}

// Create a Database Connection
new ConnectionManager(
  {
    engine: Configuration.database.engine,
    type: Configuration.database.type,
    uri: Configuration.database.uri,
    logs:
      typeof Configuration.database.logs === "boolean"
        ? Configuration.database.logs
        : process.env.NODE_ENV === "development",
    sync:
      typeof Configuration.database.sync === "boolean"
        ? Configuration.database.sync
        : process.env.NODE_ENV === "development",
    ...Configuration.database.options,
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
    )
      .listen(process.env.PORT || 8080)
      .then(async () => {
        // Initialize Cron Jobs
        await InitializeCronJobs();
      })
  );
