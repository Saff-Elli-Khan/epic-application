import {
  Schema,
  SQLString,
  SQLEnum,
  SQLNumber,
  SQLObject,
  SQLManyRelation,
  SQLOneRelation,
  SQLBoolean,
} from "epic-sql";
import { Profiles } from "./profiles";
import { Permissions } from "./permissions";
import { Passwords } from "./passwords";
import { Subscriptions } from "./subscriptions";

export const Users = new Schema("users", {
  userId: new SQLString({
    isUnique: true,
    isSearchable: true,
  }),

  fname: new SQLString({
    isSearchable: true,
  }),

  lname: new SQLString({
    isNullable: true,
    isSearchable: true,
  }),

  activity: new SQLEnum(["Online", "Offline"], {
    defaultValue: "Online",
    isSearchable: true,
  }),

  status: new SQLEnum(["Active", "Blocked"], {
    defaultValue: "Active",
    isSearchable: true,
  }),

  lastAccess: new SQLNumber({
    isPublic: false,
    defaultValue: () => Date.now(),
  }),

  tags: new SQLObject<Array<string>, any, any>({
    isPublic: false,
    defaultValue: () => [],
    isSearchable: true,
  }),

  isPublic: new SQLBoolean({
    isPublic: false,
    defaultValue: true,
  }),

  passwords: new SQLManyRelation(() => Passwords.new(), "userId"),

  subscriptions: new SQLManyRelation(() => Subscriptions.new(), "userId"),

  profile: new SQLOneRelation(() => Profiles.new(), "userId"),

  permissions: new SQLOneRelation(() => Permissions.new(), "userId"),

  modifiedOn: new SQLNumber({
    isPublic: false,
    defaultValue: () => Date.now(),
    updatedValue: () => Date.now(),
  }),

  createdOn: new SQLNumber({
    defaultValue: () => Date.now(),
  }),
} as const);
