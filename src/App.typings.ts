import { EpicSQLManager } from "@saffellikhan/epic-sql";
import { GeoData, TokensManager, Validator } from "./App.globals";

// Override Express Interfaces
declare module "express-serve-static-core" {
  interface Request {
    id: string;
    name: string;
    permissions: string[];
    clientIp: string;
    database: EpicSQLManager<any, any>;
    geo: typeof GeoData;
    tokens: typeof TokensManager;
    validator: typeof Validator;
  }
}
