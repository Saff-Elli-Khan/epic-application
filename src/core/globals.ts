import { Validation } from "epic-validator";
import { EpicGeo } from "epic-geo";
import { EpicTokens } from "epic-tokens";
import { ConfigManager } from "@saffellikhan/epic-cli";
import { Schedular } from "@saffellikhan/epic-schedular";
import { join as PathJoin } from "path";

// Load Environment Variables
require("dotenv").config({
  path: PathJoin(process.cwd(), `./env/.${process.env.NODE_ENV}.env`),
});

// Global Tokens Manager
export const TokensManager = new EpicTokens(
  () => process.env.ENCRYPTION_KEY || "nb4ZHjgVgu0BtM83K97ZNyw8934xUp2Z"
);

// Geo Data Library
export const GeoData = new EpicGeo();

// Data Validator Library
export const Validator = new Validation({
  isName: (_, entity) =>
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
  isShortDescription: (_, entity?: string) =>
    _.isString(`Please provide a valid Short ${entity || "Short Description"}!`)
      .isLength(
        { min: 15 },
        `Minimum 15 characters required for Short ${
          entity || "Short Description"
        }!`
      )
      .isLength(
        { max: 300 },
        `Maximum 300 characters allowed for ${entity || "Short Description"}!`
      ),
  isDescription: (_, entity?: string, length?: number) =>
    _.isString(`Please provide a valid Short ${entity || "Description"}!`)
      .isLength(
        { min: 15 },
        `Minimum 15 characters required for Short ${entity || "Description"}!`
      )
      .isLength(
        { max: length || 1500 },
        `Maximum ${length || 1500} characters allowed for ${
          entity || "Description"
        }!`
      ),
  isFirstName: (_) =>
    _.isString("First name should be a string!")
      .notEmpty({ falsy: true }, "First name cannot be empty!")
      .isLength({ max: 50 }, "Maximum 50 characters allowed for First name!"),
  isLastName: (_) =>
    _.optional({ falsy: true })
      .isString("Last name should be a string!")
      .isLength({ max: 50 }, "Maximum 50 characters allowed for Last name!"),
  isUserName: (_) =>
    _.isAlphanumeric({}, "Please provide a valid Username!")
      .not()
      .isIn(
        ["admin", "administrator", "methods"],
        "Invalid Username has been provided!"
      ),
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
      "You need to Agree our Terms of Services & Privacy policy!"
    ),
  isPrice: (_) =>
    _.isNumeric({ sanitize: true }, "Please provide a valid Amount!").isAmount(
      { min: 1 },
      "Minimum allowed Amount is 1!"
    ),
  isQuantity: (_) =>
    _.isNumeric(
      { sanitize: true },
      "Please provide a valid Quantity!"
    ).isAmount({ min: 1 }, "Minimum allowed Quantity is 1!"),
  isCountry: (_) =>
    _.isIn(GeoData.countryList(), "Invalid Country Name has been provided!"),
  isContact: (_) =>
    _.isNumeric(
      { sanitize: true },
      "Please provide a valid Contact Number!"
    ).isLength(
      { min: 7, max: 15 },
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

// Create a Cron Scheduler Instance
export const Schedule = new Schedular();

// Inject Environment Variables into objects
const InjectEnv = <T extends Record<string, any>>(object: T): T => {
  for (const Key in object) {
    const Value = object[Key];
    if (typeof Value === "string")
      object[Key] = Value.replace(
        /object\(\s*\{\s*\{\s*(\w+)\s*\}\s*\}\s*\)/g,
        (_: string, key: string) =>
          typeof process.env[key] === "string"
            ? JSON.parse(process.env[key]!)
            : process.env[key]
      ).replace(
        /\{\s*\{\s*(\w+)\s*\}\s*\}/g,
        (_: string, key: string) => process.env[key]
      );
    else if (typeof Value === "object" && Value !== null)
      object[Key] = InjectEnv(Value);
  }

  return object;
};

// Get Application Configuration
export const Configuration = InjectEnv(ConfigManager.getConfig("main"));

// Get Application Settings
export const Settings: Record<string, any> =
  Configuration.other[require("../../package.json").name];
