import "./controllers";
import { NODE_ENV } from "@App/common";
import {
  HTTP,
  EpicApplication,
  Request,
  Response,
  CreateResponse,
} from "@saffellikhan/epic-express";
import { ValidationException } from "@oridune/validator";
import { Middlewares } from "./middlewares";
import { Events } from "./events";
import { ExecuteJobs } from "./jobs";
import { DatabaseAdapter } from "./database";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "http-status";

// Prepare Application
export class Application extends EpicApplication {
  _beforeInit = async () => {
    // Sync Database in Development
    if (process.env.NODE_ENV === NODE_ENV.DEVELOPMENT)
      await DatabaseAdapter.sync();

    // Install Middlewares
    await Middlewares(this.Framework);

    // Start Executing Jobs
    await ExecuteJobs();
  };
  _onRouteError = (err: any, req: Request, res: Response) => {
    // If the status code was not changed than predict it
    if (res.statusCode === OK)
      if (err instanceof ValidationException)
        // Request Validation Error
        res.status(BAD_REQUEST);
      // Page Not Found
      else if (err?.message === "Not Found") res.status(NOT_FOUND);
      // Internal Server Error
      else res.status(INTERNAL_SERVER_ERROR);

    // Emit Internal Server Error Event
    if (res.statusCode >= INTERNAL_SERVER_ERROR) {
      Events.emit("internal_server_error", {
        errorId: req.id,
        message: err.message || err,
        stack: err.stack || err,
      });

      return new CreateResponse(
        process.env.NODE_ENV !== NODE_ENV.PRODUCTION
          ? err.message || err
          : req.translator.tr(
              `Internal server error! Please contact support with the following Error ID: <>.`,
              { params: [req.id] }
            ),
        process.env.NODE_ENV !== NODE_ENV.PRODUCTION
          ? { stack: err.stack || err }
          : {}
      ).isFalse();
    }

    // Return Response Object
    return new CreateResponse(
      err?.issues || err?.message || err || "Unknown error occured!"
    ).isFalse();
  };
}

// Create HTTP Server
export const HTTPServer = new HTTP(new Application());
