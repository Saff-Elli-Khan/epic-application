import "./controllers";
import { NODE_ENV } from "@App/common";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "http-status";
import {
  HTTP,
  EpicApplication,
  Request,
  Response,
  CreateResponse,
} from "@saffellikhan/epic-express";
import { Middlewares } from "./middlewares";
import { ValidatorException } from "epic-validator";
import { Events } from "./events";

// Prepare Application
export class Application extends EpicApplication {
  _beforeInit = () => Middlewares(this.Framework);
  _onRouteError = (err: any, req: Request, res: Response) => {
    // If the status code was not changed than predict it
    if (res.statusCode === OK)
      if (err instanceof ValidatorException)
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
      err?.List || err?.message || err || "Unknown error occured!"
    ).isFalse();
  };
}

// Create HTTP Server
export const HTTPServer = new HTTP(new Application());
