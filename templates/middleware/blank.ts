/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */

import { Request, Response, NextFunction } from "express";
/* @ImportsContainer */
/* /ImportsContainer */

export const SampleMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Continue to next middleware
  next();
};
