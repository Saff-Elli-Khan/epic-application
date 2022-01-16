/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */

import { Request, Response, NextFunction } from "@saffellikhan/epic-express";
/* @ImportsContainer */
/* /ImportsContainer */

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
