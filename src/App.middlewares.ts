import EXPRESS, { Express, Request, Response, NextFunction } from "express";
import CreateError from "http-errors";
import Compression from "compression";
import Cors from "cors";
import Helmet from "helmet";
import Logger from "morgan";
import Path from "path";
import CookieParser from "cookie-parser";
import Routes from "./routes";
import Schemas from "./database";
import { IpDeniedError } from "express-ipfilter";
import { CoreMiddlewares } from "./middlewares/core";
import { ConnectionManager, Connector } from "epic-sql";
import { Configuration } from "./App.globals";
import { CoreHelpers } from "./helpers/core";
import { PermissionsException } from "epic-permissions-manager";
import { EpicTokensVerificationException } from "epic-tokens";

export const Middlewares = (App: Express) =>
  App.use([
    Logger("dev"),
    Cors(),
    Helmet(),
    CookieParser(),
    Compression(),
    EXPRESS.json(),
    EXPRESS.urlencoded({ extended: true }),
  ])

    // Public Static Resources
    .use(
      "/public/*",
      CoreMiddlewares.useStatic(
        Path.join(process.cwd(), Configuration().APP.publicDir)
      )
    )

    // Create Database Connection
    .use(async (req: Request, _res: Response, next: NextFunction) => {
      try {
        // Create New SQL Connection
        req.database = await new ConnectionManager(
          new Connector(
            Configuration().DATABASE.connection,
            Configuration().DATABASE.options
          ),
          Schemas
        ).init();

        return next();
      } catch (error) {
        return next(error);
      }
    })

    // Load Core Middlewares
    .use(
      CoreMiddlewares.useAuthorization(),
      CoreMiddlewares.usePermissions(),
      CoreMiddlewares.useLanguage(),
      CoreMiddlewares.useCurrency(),
      CoreMiddlewares.useIPAddress(),
      CoreMiddlewares.useFinalTasks((req) =>
        // End Database Connection
        setTimeout(() => req.database.getConnector().end(), 10000)
      )
    )

    // Application Routes
    .use(Routes)

    // Catch 404 and forward to error handler
    .use((_req: Request, _res: Response, next: NextFunction) =>
      next(CreateError(404))
    )

    // Error handler
    .use(
      async (
        error: Error,
        req: Request,
        res: Response,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _next: NextFunction
      ) => {
        // Request Error
        if (error instanceof Array) res.status(400);
        // Permissions Error
        else if (error instanceof PermissionsException) res.status(401);
        // Authorization Failed
        else if (error instanceof EpicTokensVerificationException)
          res.status(403);
        // Check If IP Address Error
        else if (error instanceof IpDeniedError) res.status(403);
        // Page Not Found
        else if (error.message === "Not Found") res.status(404);
        // Unknown Error
        else res.status(500);

        // Send Formated JSON Response Back
        res.json(
          CoreHelpers.controllerEvent(
            "error",
            req,
            await CoreHelpers.response(
              false,
              error,
              Configuration().DEBUGING ? error.stack : {}
            )
          )
        );
      }
    );
