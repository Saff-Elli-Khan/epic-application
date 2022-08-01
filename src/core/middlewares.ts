import EXPRESS, { Express, Request, Response, NextFunction } from "express";
import Compression from "compression";
import Cors from "cors";
import Helmet from "helmet";
import Hpp from "hpp";
import Logger from "morgan";
import CookieParser from "cookie-parser";
import UserAgent from "express-useragent";
import RateLimiter from "express-rate-limit";
import { TOO_MANY_REQUESTS } from "http-status";
import { DatabaseSession } from "@oridune/epic-odm";
import { DatabaseAdapter } from "./database";
import { TokensManager } from "./tokens";
import { LoadModules } from "./helpers/loaders";
import { Translation } from "./translation";
import { GeoData } from "./geo";
import { Events } from "./events";
import { RedisClient } from "./redis";

export const Middlewares = async (Framework: Express) =>
  Framework
    // Utility Middlewares
    .use([
      Logger("dev"),
      Helmet(),
      Hpp(),
      Cors({
        origin: process.env.CORS_ALLOW_ORIGIN?.split(",").map((item) =>
          item.trim()
        ),
        allowedHeaders: process.env.CORS_ALLOW_HEADERS?.split(",").map((item) =>
          item.trim()
        ),
        credentials: ["true", "1"].includes(
          process.env.CORS_ALLOW_CREDENTIALS || ""
        ),
        exposedHeaders: process.env.CORS_EXPOSED_HEADERS?.split(",").map(
          (item) => item.trim()
        ),
        methods: process.env.CORS_ALLOW_METHODS?.split(",").map((item) =>
          item.trim()
        ),
        preflightContinue: ["true", "1"].includes(
          process.env.CORS_PREFLIGHT_CONTINUE || ""
        ),
      }),
      CookieParser(),
      Compression(),
      UserAgent.express(),
      EXPRESS.json({
        verify: (req, _, buffer) => {
          // @ts-ignore
          req.rawBody = buffer;
        },
      }),
      EXPRESS.urlencoded({ extended: true }),
      RateLimiter({
        handler: (_, res, next) => {
          res.status(TOO_MANY_REQUESTS);
          next(new Error(`Too many requests, please try again later.`));
        },
        windowMs: parseInt(process.env.RATE_LIMITER_WAITING_TIME || "90000"),
        max: parseInt(process.env.RATE_LIMITER_MAX || "100"),
      }),

      // Global Utilities Injector Middleware
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          // Create Database Session
          req.database = await new DatabaseSession(DatabaseAdapter).start();

          // Add Utilities
          req.redis = RedisClient;
          req.geo = GeoData;
          req.tokens = TokensManager;
          req.translator = Translation.session();

          // On Request End
          res.on("close", async () => {
            // Final Tasks
            await req.response?.AfterResponse?.();

            // Emit Event
            Events.emit(req.name, req);

            // Close Database Session
            req.database.end();
          });

          // Continue to Next Middleware
          next();
        } catch (error) {
          next(error);
        }
      },

      // Load Modules
      ...(await Promise.all(LoadModules("middleware"))),
    ]);
