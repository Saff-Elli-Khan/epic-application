import {
  SQLNumber,
  Schema,
  SQLString,
  SQL_UUID,
  SQLOneRelation,
} from "epic-sql";
import { Uploads } from "./uploads";

export const Avatars = new Schema("avatars", {
  avatarId: new SQLNumber({
    isLength: 50,
    defaultValue: new SQL_UUID().SHORT,
  }),

  userId: new SQLString({
    isBinary: true,
  }),

  uploadId: new SQLNumber({
    isLength: 50,
  }),

  upload: new SQLOneRelation(() => Uploads.new(), "uploadId"),

  createdOn: new SQLNumber({
    defaultValue: () => Date.now(),
  }),
} as const);
