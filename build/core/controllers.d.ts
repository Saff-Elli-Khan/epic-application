/// <reference types="express" />
import { Request, Response, CreateResponse } from "@saffellikhan/epic-express";
export declare class APIController {
    APIHome(_: Request, res: Response): Promise<CreateResponse>;
}
export declare class AppController {
    AppHome(_: Request): Promise<CreateResponse>;
}
