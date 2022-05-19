import EXPRESS, { Express, Request, Response, NextFunction } from "express";
import Compression from "compression";
import Cors from "cors";
import Helmet from "helmet";
import Logger from "morgan";
import CookieParser from "cookie-parser";
import UserAgent from "express-useragent";
import Path from "path";
import Fs from "fs";
import { DatabaseSession } from "@oridune/epic-odm";
import {
  Configuration,
  DatabaseDriver,
  GeoData,
  TokensManager,
  Validator,
} from "./globals";

export const Middlewares = (Framework: Express) =>
  Framework
    // Utility Middlewares
    .use([
      Logger("dev"),
      Cors(),
      Helmet(),
      CookieParser(),
      Compression(),
      UserAgent.express(),
      EXPRESS.json(),
      EXPRESS.urlencoded({ extended: true }),

      // Global Features Injector Middleware
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          // Create Database Session
          req.database = await new DatabaseSession(DatabaseDriver).start();

          // Add Common Features
          req.geo = GeoData;
          req.tokens = TokensManager;
          req.validator = Validator;

          // Basic Query Validation
          await req.validator
            .validate(req.query)
            .schema(
              {
                search: (_) =>
                  _.optional().isString(
                    "Please provide a valid Search string!"
                  ),
                limit: (_) =>
                  _.optional()
                    .isNumeric(
                      { sanitize: true },
                      "Please provide a valid limit!"
                    )
                    .isAmount(
                      { min: 1 },
                      "Please provide limit greater than 0!"
                    ),
                offset: (_) =>
                  _.optional()
                    .isNumeric(
                      { sanitize: true },
                      "Please provide a valid offset!"
                    )
                    .isAmount(
                      { min: 0 },
                      "Please provide offset greater than or equal to 0!"
                    ),
                sort: (_) =>
                  _.optional().isIn(
                    ["ASC", "DESC"],
                    "Please provide valid sorting ASC or DESC!"
                  ),
                createdBetween: (_) =>
                  _.optional()
                    .likeArray(
                      { sanitize: true },
                      "Please provide a valid timestamp list!"
                    )
                    .isLength(
                      { min: 2, max: 2 },
                      "Please provide a valid Range Array!"
                    )
                    .each((_) =>
                      _.isNumeric(
                        { sanitize: true },
                        "Please provide a valid Unix timestamp!"
                      )
                    ),
                modifiedBetween: (_) =>
                  _.optional()
                    .likeArray(
                      { sanitize: true },
                      "Please provide a valid timestamp list!"
                    )
                    .isLength(
                      { min: 2, max: 2 },
                      "Please provide a valid Range Array!"
                    )
                    .each((_) =>
                      _.isNumeric(
                        { sanitize: true },
                        "Please provide a valid Unix timestamp!"
                      )
                    ),
              },
              { strict: false }
            )
            .exec();

          // On Request End
          res.on("close", async () => {
            // Final Tasks
            await req.response?.AfterResponse();

            // Close Database Connection
            req.database.end();
          });

          // Continue to Next Middleware
          next();
        } catch (error) {
          next(error);
        }
      },

      // Load Plugins
      ...Object.keys(Configuration.plugins).reduce<(new () => any)[]>(
        (items, pluginName) => [
          ...items,
          ...Fs.readdirSync(
            Path.join(
              process.cwd(),
              `./node_modules/${pluginName}/build/middlewares/`
            )
          )
            .filter((filename) => /^[A-Z]\w+\.(ts|js)$/.test(filename))
            .map(
              (filename) =>
                require(Path.join(
                  process.cwd(),
                  `./node_modules/${pluginName}/build/middlewares/${filename}`
                ))[filename.replace(/\.(ts|js)$/, "") + "Middleware"]
            ),
        ],
        []
      ),

      // Local Imports
      ...Fs.readdirSync(Path.join(process.cwd(), "./src/middlewares/"))
        .filter((filename) => /^[A-Z]\w+\.(ts|js)$/.test(filename))
        .map(
          (filename) =>
            require(Path.join(process.cwd(), `./src/middlewares/${filename}`))[
              filename.replace(/\.(ts|js)$/, "") + "Middleware"
            ]
        ),
    ]);
