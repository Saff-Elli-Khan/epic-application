import { CreateResponse } from "@saffellikhan/epic-express";
import { ModelsManager } from "@saffellikhan/epic-orm";
import { DECODED_TOKEN } from "epic-tokens";
import { GeoData, TokensManager, Validator } from "./globals";

export interface AuthorizationPayload {
  source: string;
  target: string;
  role?: string;
  permissions?: string[];
}

// Override Express Interfaces
declare module "express-serve-static-core" {
  interface Request {
    id: string;
    name: string;
    response?: CreateResponse;
    permissions?: string[];
    clientIp: string;
    modelsManager: ModelsManager;
    geo: typeof GeoData;
    tokens: typeof TokensManager;
    validator: typeof Validator;
    authorization?: DECODED_TOKEN<"Authorization", AuthorizationPayload, any>;
  }
}
