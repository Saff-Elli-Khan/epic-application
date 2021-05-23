import { PermissionsInterface } from "epic-permissions-manager";
import { ConnectionManager } from "epic-sql";
import { DECODED_TOKEN } from "epic-tokens";
import { PermissionsManager } from "../App.globals";
import { AuthorizationPayload } from "./index";

declare module "express-serve-static-core" {
  interface Request {
    clientIp: string;
    language: string;
    currency: string;
    date?: Date;
    database: ConnectionManager<any>;
    authorization?: DECODED_TOKEN<
      "Authorization",
      AuthorizationPayload,
      "Live" | "Test"
    >;
    permissions: PermissionsInterface<typeof PermissionsManager>;
  }
}
