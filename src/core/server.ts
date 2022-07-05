import "./controllers";
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
import { Utils } from "@oridune/epic-odm";
import { Events } from "./globals";

// Prepare Application
export class Application extends EpicApplication {
  _beforeInit = () => Middlewares(this.Framework);
  _onRouteError = (err: any, req: Request, res: Response) => {
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

    // Emit Internal Server Error Event
    if (!(err instanceof ValidatorException))
      Events.emit("internal_server_error", {
        errorId: req.id,
        message: err.message || err,
        stack: err.stack || err,
      });

    // Return Response Object
    return new CreateResponse(
      err instanceof ValidatorException
        ? err.List
        : process.env.NODE_ENV !== "production"
        ? err.message || err
        : req.translator.tr(
            `Internal server error! Please contact support with the following Error ID: <>.`,
            { params: [req.id] }
          ),
      process.env.NODE_ENV !== "production" ? { stack: err.stack || err } : {}
    ).isFalse();
  };
}

// Create HTTP Server
export const HTTPServer = new HTTP(new Application());
