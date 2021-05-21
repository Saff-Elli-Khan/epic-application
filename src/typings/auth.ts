import { SCHEMA } from "epic-sql";
import { Permissions } from "../database/core/permissions";

export interface AuthorizationPayload {
  userId: string;
  fname: string;
  lname: string;
  status: "Active" | "Blocked";
  permissions: SCHEMA<typeof Permissions>;
}
