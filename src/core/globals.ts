import { Validation } from "epic-validator";
import { EpicGeo } from "epic-geo";
import { EpicTokens } from "epic-tokens";
import { Schedular } from "@saffellikhan/epic-schedular";
import { MongoDBDriver } from "@oridune/epic-odm";
import Redis from "ioredis";
import Path from "path";
import Fs from "fs";

// Load Environment Variables
require("dotenv").config({
  path: Path.join(process.cwd(), `./env/.${process.env.NODE_ENV}.env`),
});

// Global Tokens Manager
export const TokensManager = new EpicTokens(
  () => process.env.ENCRYPTION_KEY || "nb4ZHjgVgu0BtM83K97ZNyw8934xUp2Z"
);

// Geo Data Library
export const GeoData = new EpicGeo();

// Data Validator Library
export const Validator = new Validation({
  isName: (_, entity?: string) =>
    _.isString(
      `Please provide a valid ${
        typeof entity === "string" ? entity + " " : ""
      }Name!`
    )
      .isLength(
        { min: 2 },
        `Minimum 2 characters required for ${
          typeof entity === "string" ? entity + " " : ""
        }Name!`
      )
      .isLength(
        { max: 50 },
        `Maximum 50 characters allowed for ${
          typeof entity === "string" ? entity + " " : ""
        }Name!`
      ),
  isTitle: (_, entity?: string) =>
    _.isString(`Please provide a valid ${entity || "Title"}!`)
      .isLength(
        { min: 5 },
        `Minimum 5 characters required for ${entity || "Title"}!`
      )
      .isLength(
        { max: 100 },
        `Maximum 100 characters allowed for ${entity || "Title"}!`
      ),
  isShortString: (_, entity?: string) =>
    _.isString(`Please provide a valid ${entity || "Short String"}!`)
      .isLength(
        { min: 15 },
        `Minimum 15 characters required for ${entity || "Short String"}!`
      )
      .isLength(
        { max: 300 },
        `Maximum 300 characters allowed for ${entity || "Short String"}!`
      ),
  isDescription: (_, entity?: string, length = 1500) =>
    _.isString(`Please provide a valid ${entity || "Description"}!`)
      .isLength(
        { min: 15 },
        `Minimum 15 characters required for ${entity || "Description"}!`
      )
      .isLength(
        { max: length },
        `Maximum ${length} characters allowed for ${entity || "Description"}!`
      ),
  isUserName: (_, notIn: string[] = []) =>
    _.isAlphanumeric({}, "Please provide a valid Username!")
      .isLength({ max: 50 }, "Maximum 50 characters allowed for Username!")
      .not()
      .isIn(notIn, "Invalid Username has been provided!"),
  isGender: (_) =>
    _.isIn(
      ["Male", "Female", "Unknown"],
      "Please provide a valid Gender 'Male', 'Female' or 'Unknown'!"
    ),
  isPassword: (_) =>
    _.required()
      .isAlphanumeric(
        { allowSpaces: false, strict: true },
        "A valid Alphanumeric Password is required!"
      )
      .isLength(
        { min: 6, max: 50 },
        "Minimum 6 and Maximum 50 characters allowed for Password!"
      ),
  isAgreement: (_) =>
    _.likeBoolean(
      { sanitize: true, isTrue: true },
      "You must accept our agreement!"
    ),
  isPrice: (_, min = 1) =>
    _.isNumeric({ sanitize: true }, "Please provide a valid Amount!").isAmount(
      { min },
      `Minimum allowed Amount is ${min}!`
    ),
  isQuantity: (_, min = 1) =>
    _.isNumeric(
      { sanitize: true },
      "Please provide a valid Quantity!"
    ).isAmount({ min }, `Minimum allowed Quantity is ${min}!`),
  isCountry: (_) =>
    _.isIn(GeoData.countryList(), "Invalid Country Name has been provided!"),
  isContact: (_) =>
    _.isNumeric(
      { sanitize: true },
      "Please provide a valid Contact Number!"
    ).isLength(
      { min: 8, max: 11 },
      "Please provide a valid Contact Number Length!"
    ),
  isContactString: (_) =>
    _.isString("Please provide a valid Contact!").isLength(
      { min: 8, max: 13 },
      "Please provide a valid Contact Number Length!"
    ),
  isBankCodeType: (_) =>
    _.isIn(
      ["Sort", "Swift", "BIC", "BSB"],
      "Please provide a valid Bank Code Type!"
    ),
  isBankAccountNumberType: (_) =>
    _.isIn(
      ["Local", "International"],
      "Please provide a valid Bank Account Number Type!"
    ),
  isBankAccountNumber: (_, type) =>
    type === "Local"
      ? _.isNumeric(
          { sanitize: true },
          "Invalid Bank Account Number has been provided!"
        )
      : _.use("isIBAN"),
});

// Inject Environment Variables into objects
const InjectEnv = <T extends Record<string, any>>(object: T): T => {
  for (const Key in object) {
    // Get Value
    const Value = object[Key];
    if (typeof Value === "string") {
      // Resolve if value is an Object
      const MatchObject = /(object|boolean|number|string|list)\(\s*\{\s*\{\s*(\w+)\s*\}\s*\}\s*\)/.exec(
        Value
      );

      if (MatchObject) {
        if (MatchObject[1] === "object")
          object[Key] = JSON.parse(process.env[MatchObject[2]] || "{}");
        else if (MatchObject[1] === "boolean")
          object[Key] = ["1", "true"].includes(
            (process.env[MatchObject[2]] || "").toString().toLowerCase()
          ) as any;
        else if (MatchObject[1] === "number")
          object[Key] = parseFloat(process.env[MatchObject[2]] || "") as any;
        else if (MatchObject[1] === "string")
          object[Key] = process.env[MatchObject[2]] as any;
        else if (MatchObject[1] === "list")
          object[Key] = (process.env[MatchObject[2]] || "")
            .split(",")
            .map((_) => _.trim()) as any;
        else
          object[Key] = Value.replace(
            /\{\s*\{\s*(\w+)\s*\}\s*\}/g,
            (_: string, key: string) => process.env[key]
          ) as any;
      } else
        object[Key] = Value.replace(
          /\{\s*\{\s*(\w+)\s*\}\s*\}/g,
          (_: string, key: string) => process.env[key]
        );
    } else if (typeof Value === "object" && Value !== null)
      object[Key] = InjectEnv(Value);
  }

  return object;
};

// Get Epic Configuration
export const Configuration = InjectEnv(
  require(Path.join(process.cwd(), "./package.json")).epic || {}
);

// Create Database Driver
export const DatabaseDriver = new MongoDBDriver(
  [
    // Load Plugins
    ...Object.keys(Configuration.plugins).reduce<(new () => any)[]>(
      (items, pluginName) => [
        ...items,
        ...(!Configuration.plugins[pluginName].disabled
          ? Fs.readdirSync(
              Path.join(
                process.cwd(),
                `./node_modules/${pluginName}/build/models/`
              )
            )
              .filter((filename) => /^[A-Z]\w+\.(ts|js)$/.test(filename))
              .map(
                (filename) =>
                  require(Path.join(
                    process.cwd(),
                    `./node_modules/${pluginName}/build/models/${filename}`
                  ))[filename.replace(/\.(ts|js)$/, "")]
              )
          : []),
      ],
      []
    ),

    // Local Imports
    ...(!Configuration.disabled
      ? Fs.readdirSync(Path.join(process.cwd(), "./src/models/"))
          .filter((filename) => /^[A-Z]\w+\.(ts|js)$/.test(filename))
          .map(
            (filename) =>
              require(Path.join(process.cwd(), `./src/models/${filename}`))[
                filename.replace(/\.(ts|js)$/, "")
              ]
          )
      : []),
  ],
  process.env.DATABASE_URL || "mongodb://localhost:27017/test",
  {},
  process.env.NODE_ENV === "development"
);

// Create Redis Client
export const RedisClient = process.env.REDIS_HOST
  ? new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || "6379"),
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
    })
  : undefined;

// Create a Cron Scheduler Instance
export const Schedule = new Schedular({
  name: require("../../package.json").name,
  redis: RedisClient,
});
