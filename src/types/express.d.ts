import { EpicSQLManager } from "@saffellikhan/epic-sql";
import { DECODED_TOKEN } from "epic-tokens";
import { SchemaList } from "../database";
import { AuthorizationPayload } from "./index";

declare module "express-serve-static-core" {
  interface Request {
    id: string;
    name: string;
    permissions: string[];
    clientIp: string;
    authorization?: DECODED_TOKEN<
      "Authorization",
      AuthorizationPayload,
      "Live" | "Test"
    >;
    language: string;
    currency: string;
    database: EpicSQLManager<any, typeof SchemaList>;
  }
}
