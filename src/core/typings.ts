import { DatabaseSession } from "@oridune/epic-odm";
import { CreateResponse } from "@saffellikhan/epic-express";
import { GeoData, TokensManager, Validator } from "./globals";

// Override Express Interfaces
declare module "express-serve-static-core" {
  interface Request {
    /** Get Current Request ID */
    id: string;

    /** Get Current Request Controller Name */
    name: string;

    /** Get User's IP Address */
    clientIp: string;

    /** Current User Permission List */
    permissions?: string[];

    /** Database Connection Session */
    database: DatabaseSession<any>;

    /** Get Validator Instance */
    validator: typeof Validator;

    /** Get Tokens Manager Instance */
    tokens: typeof TokensManager;

    /** Access Geo Data */
    geo: typeof GeoData;

    /** Get Current Response Object */
    response?: CreateResponse;
  }
}
