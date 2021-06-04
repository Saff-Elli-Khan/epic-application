import { Validation } from "epic-validator";
import { Users } from "./database/core/users";
import { Subscriptions } from "./database/core/subscriptions";
import { Geo } from "./App.globals";

// Global Validator Instance
export const Validator = new Validation({
  isEmail: (_) => _.isEmail(),
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
  isTitle: (_) =>
    _.isString("Please provide a valid Title!")
      .isLength({ min: 5 }, "Minimum 5 characters required for Title!")
      .isLength({ max: 50 }, "Maximum 50 characters allowed for Title!"),
  isShortDescription: (_) =>
    _.isString("Please provide a valid Short Description!")
      .isLength(
        { min: 15 },
        "Minimum 15 characters required for Short Description!"
      )
      .isLength(
        { max: 300 },
        "Maximum 300 characters allowed for Short Description!"
      ),
  isDescription: (_) =>
    _.isString("Please provide a valid Description!")
      .isLength({ min: 15 }, "Minimum 15 characters required for Description!")
      .isLength(
        { max: 1500 },
        "Maximum 1500 characters allowed for Description!"
      ),
  isFirstName: (_) =>
    _.isString("First name should be a string!")
      .notEmpty({ checkFalsy: true }, "First name cannot be empty!")
      .isLength({ max: 50 }, "Maximum 50 characters allowed for First name!"),
  isLastName: (_) =>
    _.isString("Last name should be a string!").isLength(
      { max: 50 },
      "Maximum 50 characters allowed for Last name!"
    ),
  isUserName: (_) =>
    _.isAlphanumeric({}, "Please provide a valid Username!")
      .not()
      .isIn(["admin", "administrator"], "Invalid Username has been provided!"),
  isUser: (_, message) =>
    _.isAlphanumeric(
      {},
      typeof message === "string"
        ? message
        : "A User ID should be a valid Alphanumeric String!"
    ).custom(async (userId) => {
      if (!(await Users.new().where({ userId }).count()))
        throw new Error(`User '${userId}' is not registered!`);
    }),
  notUser: (_) =>
    _.isAlphanumeric(
      {},
      "A User ID should be a valid Alphanumeric String!"
    ).custom(async (userId) => {
      if (await Users.new().where({ userId }).count())
        throw new Error(`User '${userId}' is or already registered!`);
    }),
  isSubscribed: (_) =>
    _.custom(async (value) => {
      if (!(await Subscriptions.new().where({ value }).count()))
        throw new Error(`Subscription has not been found for '${value}'!`);
    }),
  notSubscribed: (_) =>
    _.custom(async (value) => {
      if (await Subscriptions.new().where({ value }).count())
        throw new Error(`'${value}' is already Subscribed!`);
    }),
  isPassword: (_) =>
    _.required()
      .isString("A valid Password is required!")
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
  isIBAN: (_) =>
    _.matches(
      /^([A-Z]{2}[ -]?[0-9]{2})(?=(?:[ -]?[A-Z0-9]){9,30}$)((?:[ -]?[A-Z0-9]{3,5}){2,7})([ -]?[A-Z0-9]{1,3})?$/,
      "Invalid IBAN Number has been provided!"
    ),
  isCountry: (_) =>
    _.isIn(Geo.countryList(), "Invalid Country Name has been provided!"),
  isContact: (_) =>
    _.isNumeric(
      { sanitize: true },
      "Please provide a valid Contact Number!"
    ).isLength(
      { min: 7, max: 15 },
      "Please provide a valid Contact Number Length!"
    ),
});
