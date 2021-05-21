import {
  SQLNumber,
  SQLObject,
  Schema,
  SQLString,
  SQL_UUID,
  SQLContent,
  SQLEnum,
} from "epic-sql";

export const Profiles = new Schema("profiles", {
  profileId: new SQLNumber({
    isLength: 50,
    isUnique: true,
    defaultValue: new SQL_UUID().SHORT,
  }),

  userId: new SQLString({
    isUnique: true,
  }),

  email: new SQLString({
    isPublic: false,
    isNullable: true,
  }),

  contact: new SQLNumber({
    isPublic: false,
    isNullable: true,
  }),

  occupation: new SQLString({
    isNullable: true,
  }),

  business: new SQLString({
    isNullable: true,
  }),

  website: new SQLString({
    isNullable: true,
  }),

  bio: new SQLContent({
    isNullable: true,
  }),

  birthDate: new SQLNumber({
    isPublic: false,
    isNullable: true,
  }),

  gender: new SQLEnum(["Male", "Female", "Other"], {
    isNullable: true,
  }),

  country: new SQLString({
    isNullable: true,
  }),

  state: new SQLString({
    isPublic: false,
    isNullable: true,
  }),

  city: new SQLString({
    isPublic: false,
    isNullable: true,
  }),

  address_1: new SQLString({
    isPublic: false,
    isLength: 100,
    isNullable: true,
  }),

  address_2: new SQLString({
    isPublic: false,
    isLength: 100,
    isNullable: true,
  }),

  socialLinks: new SQLObject({
    defaultValue: () => ({
      facebook: null,
      twitter: null,
      linkedIn: null,
      instagram: null,
      youtube: null,
    }),
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
