import EXPRESS, { Express } from "express";
import Compression from "compression";
import Cors from "cors";
import Helmet from "helmet";
import Hpp from "hpp";
import Logger from "morgan";
import CookieParser from "cookie-parser";
import UserAgent from "express-useragent";
import RateLimiter from "express-rate-limit";
import { TOO_MANY_REQUESTS } from "http-status";
import { DefaultCorsConfiguration } from "@App/common";
import { InjectRequestUtils, HandleRequestClose } from "./helpers/middlewares";
import { LoadModules } from "./helpers/loaders";

export const UtilityMiddlewares = async (Framework: Express) =>
  Framework
    // Utility Middlewares
    .use([
      Logger("dev"),
      RateLimiter({
        handler: (_, res, next) => {
          res.status(TOO_MANY_REQUESTS);
          next(new Error(`Too many requests, please try again later.`));
        },
        windowMs: parseInt(process.env.RATE_LIMITER_WAITING_TIME || "90000"),
        max: parseInt(process.env.RATE_LIMITER_MAX || "100"),
      }),
      Helmet(),
      Hpp(),
      Cors(DefaultCorsConfiguration),
      CookieParser(),
      Compression(),
      UserAgent.express(),
      EXPRESS.json({
        verify: (req, _, buffer) => {
          req.rawBody = buffer;
        },
      }),
      EXPRESS.urlencoded({ extended: true }),
    ]);

export const AppMiddlewares = async (Framework: Express) =>
  Framework.use([
    InjectRequestUtils(),
    HandleRequestClose(),

    // Load Modules
    ...(await Promise.all(LoadModules("middleware"))),
  ]);
