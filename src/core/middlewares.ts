/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <MiddlewareTemplate> {{ middleware }}, </MiddlewareTemplate> */

import EXPRESS, { Express, Request, Response, NextFunction } from "express";
import Compression from "compression";
import Cors from "cors";
import Helmet from "helmet";
import Logger from "morgan";
import CookieParser from "cookie-parser";
import { GeoData, TokensManager, Validator } from "./globals";
import { createModelsManager } from "@saffellikhan/epic-orm";
/* @ImportsContainer */
/* /ImportsContainer */

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

      // Global Features Injector Middleware
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          // Database Manager
          req.modelsManager = createModelsManager();

          // Add Rest Features
          req.geo = GeoData;
          req.tokens = TokensManager;
          req.validator = Validator;

          // On Request End
          res.on("close", async () => {
            // Final Tasks
            await req.response?.AfterResponse();

            // Close Database Connection
            req.modelsManager.end();
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
