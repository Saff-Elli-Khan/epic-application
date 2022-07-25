import e from "@oridune/validator";
import { Request, Response, NextFunction } from "@saffellikhan/epic-express";

export const SampleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Query Validation (You can remove this validation if not required)
    const Query = await e
      .object({}, { strict: false })
      .validate(req.query, { label: "CreateSample::query" });

    // Continue to next middleware
    next();
  } catch (error) {
    next(error);
  }
};
