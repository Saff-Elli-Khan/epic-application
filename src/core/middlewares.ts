import EXPRESS, { Express, Request, Response, NextFunction } from "express";
import Compression from "compression";
import Cors from "cors";
import Helmet from "helmet";
import Logger from "morgan";
import CookieParser from "cookie-parser";
import UserAgent from "express-useragent";
import { DatabaseSession } from "@oridune/epic-odm";
import { DatabaseDriver } from "./database";
import { Events, GeoData, TokensManager } from "./globals";
import { LoadModules } from "./helpers";
import { Validator } from "./validator";

export const Middlewares = (Framework: Express) =>
  Framework
    // Utility Middlewares
    .use([
      Logger("dev"),
      Helmet(),
      Cors({
        allowedHeaders: process.env.CORS_ALLOW_HEADERS,
        credentials: ["true", "1"].includes(
          process.env.CORS_ALLOW_CREDENTIALS || ""
        ),
        exposedHeaders: process.env.CORS_EXPOSED_HEADERS,
        methods: process.env.CORS_ALLOW_METHODS,
        origin: process.env.CORS_ALLOW_ORIGIN,
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

      // Global Features Injector Middleware
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          // Create Database Session
          req.database = await new DatabaseSession(DatabaseDriver).start();

          // Add Common Features
          req.geo = GeoData;
          req.tokens = TokensManager;
          req.validator = Validator;

          // On Request End
          res.on("close", async () => {
            // Final Tasks
            await req.response?.AfterResponse?.();

            // Emit Event
            Events.emit(req.name, req.response);

            // Close Database Connection
            req.database.end();
          });

          // Continue to Next Middleware
          next();
        } catch (error) {
          next(error);
        }
      },

      // Load Modules
      ...LoadModules("middleware"),
    ]);
