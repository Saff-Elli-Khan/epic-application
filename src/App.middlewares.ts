/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <MiddlewareTemplate> {{ middleware }}, </MiddlewareTemplate> */

import EXPRESS, { Express, Request, Response, NextFunction } from "express";
import Compression from "compression";
import Cors from "cors";
import Helmet from "helmet";
import Logger from "morgan";
import CookieParser from "cookie-parser";
import { GeoData, TokensManager, Validator } from "./App.globals";
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
      (req: Request, __: Response, next: NextFunction) => {
        req.geo = GeoData;
        req.tokens = TokensManager;
        req.validator = Validator;

        // Continue to Next Middleware
        next();
      },

      /* @MiddlewaresContainer */
      /* /MiddlewaresContainer */
    ]);
