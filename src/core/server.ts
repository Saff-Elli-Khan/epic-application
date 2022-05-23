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
import { DatabaseDriver, Schedule } from "./globals";
import { ExecuteJobs } from "./jobs";

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

// Create Application Server
export const Server = new HTTP(
  new Application({
    postman: {
      apiKey: process.env.POSTMAN_API_KEY || "",
      collectionId: process.env.POSTMAN_COLLECTION_ID || "",
      collectionName: process.env.POSTMAN_COLLECTION_NAME || "",
      disabled: !process.env.POSTMAN_API_KEY,
    },
  })
);

(async () => {
  // Create a Database Connection
  await DatabaseDriver.connect();

  // Start Application Server
  Server.listen(process.env.PORT || 3742).then(async () => {
    // Initialize Jobs
    await Schedule.init();

    console.log("Starting Background Jobs...");

    await ExecuteJobs();
  });
})();
