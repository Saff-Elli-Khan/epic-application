import { Request, Response, NextFunction } from "@saffellikhan/epic-express";
import { Configuration } from "@AppPath/exports";

export const LocalSettings =
  (
    appName: string,
    middlware?: (req: Request, res: Response, next: NextFunction) => any
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.settings = Configuration?.other?.[appName] || {};

    // Execute Optional Middleware
    if (typeof middlware === "function") return middlware(req, res, next);
    else next();
  };
