import {
  SQLContent,
  SQLEnum,
  SQLNumber,
  Schema,
  SQLString,
  SQL_UUID,
} from "epic-sql";

export const Passwords = new Schema("passwords", {
  passwordId: new SQLNumber({
    isLength: 50,
    isUnique: true,
    defaultValue: new SQL_UUID().SHORT,
  }),

  userId: new SQLString(),

  password: new SQLContent({
    isPublic: false,
  }),

  status: new SQLEnum(["Valid", "Expired"], {
    isPublic: false,
    defaultValue: "Valid",
  }),

  createdOn: new SQLNumber({
    defaultValue: () => Date.now(),
  }),
} as const);
