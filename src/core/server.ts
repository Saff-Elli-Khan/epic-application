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

// Create Application
export class Application extends EpicApplication {
  _beforeInit = () => Middlewares(this.Framework);
  _onRouteError = (err: any, _: Request, res: Response) => {
    // Request Error
    if (err instanceof ValidatorException) res.status(400);
    // Authorization Failed
    else if (err instanceof EpicTokensVerificationException) res.status(403);
    // Page Not Found
    else if (err?.message === "Not Found") res.status(404);
    // Unknown Error
    else res.status(500);

    // Return Response Object
    return new CreateResponse(
      err instanceof ValidatorException ? err.List : err.message || err,
      process.env.NODE_ENV === "development" ? err.stack : {}
    ).isFalse();
  };
}

// Start Application Server
new HTTP(new Application()).listen(process.env.PORT || 8080);