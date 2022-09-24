import { Request, Response, NextFunction } from "express";
import { DatabaseSession } from "@oridune/epic-odm";
import { DatabaseAdapter } from "../database";
import { TokensManager } from "../tokens";
import { Translation } from "../translation";
import { GeoData } from "../geo";
import { Events } from "../events";
import { RedisClient } from "../redis";

// Global Utilities Injector Middleware
export const InjectRequestUtils =
  () => async (req: Request, _res: Response, next: NextFunction) => {
    try {
      // Create Database Session
      req.database = await new DatabaseSession(DatabaseAdapter).start();

      // Add Utilities
      req.redis = RedisClient;
      req.geo = GeoData;
      req.tokens = TokensManager;
      req.translator = Translation.session();

      // Misc
      req.debugInfo = {};

      // Continue to Next Middleware
      next();
    } catch (error) {
      next(error);
    }
  };

export const HandleRequestClose =
  () => async (req: Request, res: Response, next: NextFunction) => {
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
  };
