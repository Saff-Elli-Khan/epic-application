import { Request, Response, NextFunction } from "express";

export const SampleMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Continue to next middleware
  next();
};
