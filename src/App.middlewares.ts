import EXPRESS, { Express, Request, Response, NextFunction } from "express";
import Compression from "compression";
import Cors from "cors";
import Helmet from "helmet";
import Logger from "morgan";
import CookieParser from "cookie-parser";
import Path from "path";
import { CoreMiddlewares } from "./core/middlewares";
import { Configuration } from "./App.globals";
import { Connection, EpicSQLManager } from "epic-sql";
import { SchemaList } from "./database";

export const Middlewares = (Framework: Express) =>
  Framework

    // Utility Middlewares
    .use([
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
      CoreMiddlewares.useStatic(Path.join(process.cwd(), "./public/"))
    )

    // Create Database Connection
    .use(async (req: Request, _res: Response, next: NextFunction) => {
      try {
        // Create New SQL Manager
        req.database = await new EpicSQLManager(
          new Connection(
            Configuration().DATABASE.type,
            Configuration().DATABASE.options,
            Configuration().DATABASE.logs
          ),
          SchemaList
        ).sync(!Configuration().DEBUGING);

        return next();
      } catch (error) {
        return next(error);
      }
    })

    // Core Middlewares
    .use([
      CoreMiddlewares.useAuthorization(),
      CoreMiddlewares.usePermissions(),
      CoreMiddlewares.useLanguage(),
      CoreMiddlewares.useCurrency(),
      CoreMiddlewares.useIPAddress(),
    ]);
