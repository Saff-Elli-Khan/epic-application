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
      ["Male", "Female", "Other"],
      "Please provide a valid Gender 'Male', 'Female' or 'Other'!"
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
