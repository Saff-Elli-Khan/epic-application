/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */

import { Request, Response, NextFunction } from "@saffellikhan/epic-express";
import { LocalSettings } from "@AppPath/exports";
/* @ImportsContainer */
/* /ImportsContainer */

export const SampleMiddleware = LocalSettings(
  require("../../package.json").name,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Continue to next middleware
      next();
    } catch (error) {
      next(error);
    }
  }
);
