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
    // Query Validation (You can remove this validation if not required)
    await req.validator
      .validate(req.query)
      .schema({}, { strict: false })
      .exec();

    // Continue to next middleware
    next();
  } catch (error) {
    next(error);
  }
};
