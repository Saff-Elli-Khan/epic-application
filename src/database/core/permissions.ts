import { PermissionsInterface } from "epic-permissions-manager";
import {
  SQLNumber,
  SQLObject,
  Schema,
  SQLString,
  SQL_UUID,
  SQLMeta,
} from "epic-sql";
import { Configuration, PermissionsManager } from "../../App.globals";

export const Permissions = new Schema("permissions", {
  permissionId: new SQLNumber({
    isLength: 50,
    isUnique: true,
    defaultValue: new SQL_UUID().SHORT,
  }),

  userId: new SQLString({
    isUnique: true,
  }),

  overrides: new SQLObject<
    PermissionsInterface<typeof PermissionsManager>,
    any,
    any
  >({
    isPublic: false,
  }),

  data: new SQLMeta<PermissionsInterface<typeof PermissionsManager>>(
    (row) =>
      PermissionsManager.assign(
        Configuration().USERS.default === row.userId
          ? PermissionsManager.createPermissions()
          : Configuration().USERS.permissions.authenticated,
        row.overrides
      ),
    ["userId", "overrides"]
  ),

  modifiedOn: new SQLNumber({
    isPublic: false,
    defaultValue: () => Date.now(),
    updatedValue: () => Date.now(),
  }),

  createdOn: new SQLNumber({
    defaultValue: () => Date.now(),
  }),
} as const).addPrefix("payments");
