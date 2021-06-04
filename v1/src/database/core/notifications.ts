import {
  SQLContent,
  SQLEnum,
  SQLNumber,
  Schema,
  SQLString,
  SQL_UUID,
} from "epic-sql";

export const Notifications = new Schema("notifications", {
  notificationId: new SQLNumber({
    isLength: 50,
    isUnique: true,
    defaultValue: new SQL_UUID().SHORT,
  }),

  userId: new SQLString({
    isSearchable: true,
  }),

  type: new SQLEnum(["Success", "Info", "Warning", "Danger"], {
    defaultValue: "Info",
  }),

  subject: new SQLString({
    isLength: 255,
    isNullable: true,
    collation: "utf8mb4_unicode_ci",
    isSearchable: true,
  }),

  message: new SQLContent({
    isNullable: true,
    isSearchable: true,
  }),

  body: new SQLContent({
    isNullable: true,
    isSearchable: true,
  }),

  href: new SQLString({
    isNullable: true,
  }),

  createdOn: new SQLNumber({
    defaultValue: () => Date.now(),
  }),
} as const);
