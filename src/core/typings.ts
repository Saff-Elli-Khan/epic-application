import { ConfigurationInterface } from "@saffellikhan/epic-cli";
import { CreateResponse } from "@saffellikhan/epic-express";
import { ModelsManager } from "@saffellikhan/epic-orm";
import { GeoData, TokensManager, Validator } from "./globals";

// Override Express Interfaces
declare module "express-serve-static-core" {
  interface Request {
    /** Get Current Request ID */
    id: string;

    /** Get Current Request Controller Name */
    name: string;

    /** Get Current Application's Configuration */
    config: ConfigurationInterface;

    /** Get User's IP Address */
    clientIp: string;

    /** Current User Permission List */
    permissions?: string[];

    /** Get Database Models Manager Instance */
    database: ModelsManager;

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
