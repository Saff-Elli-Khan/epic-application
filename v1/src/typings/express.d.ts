import { PermissionsInterface } from "epic-permissions-manager";
import { ConnectionManager } from "epic-sql";
import { DECODED_TOKEN } from "epic-tokens";
import { PermissionsManager } from "../App.globals";
import { AuthorizationPayload } from "./index";

declare module "express-serve-static-core" {
  interface Request {
    version: string;
    clientIp: string;
    authorization?: DECODED_TOKEN<
      "Authorization",
      AuthorizationPayload,
      "Live" | "Test"
    >;
    language: string;
    currency: string;
    date?: Date;
    database: ConnectionManager<any>;
    permissions: PermissionsInterface<typeof PermissionsManager>;
  }
}
