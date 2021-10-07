import { Request, Response, NextFunction } from "@saffellikhan/epic-express";

export const SampleMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Continue to next middleware
  next();
};
