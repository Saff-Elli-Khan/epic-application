import { Validation } from "epic-validator";
import { GeoData } from "./globals";

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
  isShortString: (_, entity?: string) =>
    _.isString(`Please provide a valid ${entity || "Short String"}!`)
      .isLength(
        { min: 5 },
        `Minimum 15 characters required for ${entity || "Short String"}!`
      )
      .isLength(
        { max: 300 },
        `Maximum 300 characters allowed for ${entity || "Short String"}!`
      ),
  isLongString: (_, entity?: string, length = 1500) =>
    _.isString(`Please provide a valid ${entity || "Description"}!`)
      .isLength(
        { min: 15 },
        `Minimum 15 characters required for ${entity || "Description"}!`
      )
      .isLength(
        { max: length },
        `Maximum ${length} characters allowed for ${entity || "Description"}!`
      ),
  isUsername: (_, notIn: string[] = []) =>
    _.isAlphanumeric({
      title: "Username",
      allowSymbols: false,
      allowSpaces: false,
    })
      .isLength({ max: 50 }, "Maximum 50 characters allowed for Username!")
      .not()
      .isIn(notIn, "Invalid Username has been provided!"),
  isGender: (_) =>
    _.isIn(
      ["male", "female", "other"],
      "Please provide a valid Gender 'male', 'female' or 'other'!"
    ),
  isPassword: (_) =>
    _.required()
      .isAlphanumeric({ title: "Password" })
      .isLength(
        { min: 6, max: 50 },
        "Minimum 6 and Maximum 50 characters allowed for Password!"
      ),
  isPrice: (_, min = 1) =>
    _.isNumeric({ sanitize: true }, "Please provide a valid Amount!").isAmount(
      { min },
      `Minimum allowed Amount is ${min}!`
    ),
  isQuantity: (_, min = 1, max?: number) =>
    _.isNumeric(
      { sanitize: true },
      "Please provide a valid Quantity!"
    ).isAmount({ min, max }, `Minimum allowed Quantity is ${min}!`),
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
  isBankCodeType: (_) =>
    _.isIn(
      ["sort", "swift", "bic", "bsb"],
      "Please provide a valid Bank Code Type!"
    ),
  isBankAccountNumberType: (_) =>
    _.isIn(
      ["local", "international"],
      "Please provide a valid Bank Account Number Type!"
    ),
  isBankAccountNumber: (_, type: "local" | "international") =>
    type === "local"
      ? _.isNumeric(
          { sanitize: true },
          "Invalid Bank Account Number has been provided!"
        )
      : _.use("isIBAN"),
});
