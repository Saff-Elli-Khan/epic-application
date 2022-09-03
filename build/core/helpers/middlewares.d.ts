import { Request, Response, NextFunction } from "express";
export declare const InjectRequestUtils: () => (
  req: Request,
  _res: Response,
  next: NextFunction
) => Promise<void>;
export declare const HandleRequestClose: () => (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;
