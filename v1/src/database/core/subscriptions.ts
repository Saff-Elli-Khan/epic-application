import {
  SQLEnum,
  SQLNumber,
  Schema,
  SQLString,
  SQL_UUID,
  SQLBoolean,
} from "epic-sql";

export const Subscriptions = new Schema("subscriptions", {
  subscriptionId: new SQLNumber({
    isLength: 50,
    isUnique: true,
    defaultValue: new SQL_UUID().SHORT,
  }),

  userId: new SQLString({
    isNullable: true,
  }),

  type: new SQLEnum(["Email", "Contact"], {
    isPublic: false,
  }),

  value: new SQLString({
    isPublic: false,
  }),

  isVerified: new SQLBoolean({
    isPublic: false,
    defaultValue: false,
  }),

  isReceiving: new SQLBoolean({
    isPublic: false,
    defaultValue: false,
  }),

  modifiedOn: new SQLNumber({
    isPublic: false,
    defaultValue: () => Date.now(),
    updatedValue: () => Date.now(),
  }),

  createdOn: new SQLNumber({
    defaultValue: () => Date.now(),
  }),
} as const);
