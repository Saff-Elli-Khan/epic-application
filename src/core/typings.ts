import { CreateResponse } from "@saffellikhan/epic-express";
import { ModelsManager } from "@saffellikhan/epic-orm";
import { GeoData, TokensManager, Validator } from "./globals";

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
  }
}
