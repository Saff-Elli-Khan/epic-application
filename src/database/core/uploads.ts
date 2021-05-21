import {
  SQLNumber,
  Schema,
  SQLString,
  SQL_UUID,
  SQLContent,
  SQLEnum,
} from "epic-sql";

export const Uploads = new Schema("uploads", {
  uploadId: new SQLNumber({
    isLength: 50,
    isUnique: true,
    defaultValue: new SQL_UUID().SHORT,
  }),

  userId: new SQLString({
    isNullable: true,
    isBinary: true,
  }),

  type: new SQLEnum(["Local", "Global"]),

  provider: new SQLString({
    isNullable: true,
  }),

  fieldName: new SQLString({
    isPublic: false,
  }),

  originalName: new SQLString({
    isLength: 200,
  }),

  mimeType: new SQLString(),

  size: new SQLNumber(),

  destination: new SQLContent({
    isPublic: false,
  }),

  fileName: new SQLString({
    isLength: 255,
  }),

  path: new SQLContent(),

  alt: new SQLString({
    isNullable: true,
  }),

  createdOn: new SQLNumber({
    isLength: 15,
    defaultValue: () => Date.now(),
  }),
} as const);
