/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <MiddlewareTemplate> {{ middleware }}, </MiddlewareTemplate> */

/* @ImportsContainer */
/* /ImportsContainer */

import EXPRESS, { Express, Request, Response, NextFunction } from "express";
import Compression from "compression";
import Cors from "cors";
import Helmet from "helmet";
import Logger from "morgan";
import CookieParser from "cookie-parser";
import UserAgent from "express-useragent";
import { createModelsManager } from "@saffellikhan/epic-orm";
import { Configuration, GeoData, TokensManager, Validator } from "./globals";

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
          // Add Configuration
          req.config = Configuration;

          // Database Manager
          req.database = createModelsManager();

          // Add Rest Features
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

      /* @MiddlewaresContainer */
      /* /MiddlewaresContainer */
    ]);
