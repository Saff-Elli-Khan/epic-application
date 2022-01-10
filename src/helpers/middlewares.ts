import { Request, Response, NextFunction } from "@saffellikhan/epic-express";
import { Configuration } from "@AppPath/exports";

export const LocalSettings =
  (appName: string) => (req: Request, _: Response, next: NextFunction) => {
    req.settings = Configuration?.other?.[appName] || {};
    next();
  };
