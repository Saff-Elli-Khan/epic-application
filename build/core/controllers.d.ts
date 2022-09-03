/// <reference types="express" />
import { Request, Response, CreateResponse } from "@saffellikhan/epic-express";
export declare class MainController {
  APIHome(_: Request, res: Response): Promise<CreateResponse>;
}
