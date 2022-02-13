/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */

/* @ImportsContainer */
/* /ImportsContainer */

import { Request, Response, NextFunction } from "@saffellikhan/epic-express";

export const SampleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Continue to next middleware
    next();
  } catch (error) {
    next(error);
  }
};
