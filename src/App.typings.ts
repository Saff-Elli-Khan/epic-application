import { EpicSQLManager, Connection } from "@saffellikhan/epic-sql";
import { SchemaList } from "./App.database";
import { GeoData, TokensManager, Validator } from "./App.globals";

// Override Express Interfaces
declare module "express-serve-static-core" {
  interface Request {
    id: string;
    name: string;
    permissions: string[];
    clientIp: string;
    database: EpicSQLManager<Connection<"mysql">, typeof SchemaList>;
    geo: typeof GeoData;
    tokens: typeof TokensManager;
    validator: typeof Validator;
  }
}
