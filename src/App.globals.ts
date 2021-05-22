import Path from "path";
import {
  CurrencyInterface,
  LanguageInterface,
  PackageInterface,
} from "./typings/core";
import { ConfigManagerUtils } from "epic-config-manager";
import { Validation } from "epic-validator";
import { EpicTokens } from "epic-tokens";
import { EpicGeo } from "epic-geo";
import { PermissionsManager as PM } from "epic-permissions-manager";
import { GatewayManager as PaymentGatewayManager } from "epic-pay";
import { Users } from "./database/core/users";
import { Subscriptions } from "./database/core/subscriptions";

// Geo Data Instance
export const Geo = new EpicGeo();

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

// Global Tokens Manager
export const TokensManager = new EpicTokens(
  () => Configuration().SECURITY.encryption.key
);

// Global Permissions Manager
export const PermissionsManager = new PM(
  [
    // Core Permissions
    "Auth",
    "Permissions",
    "Self",
    "Users",
    "Notifications",
    "Public Notifications",
    "Profiles",
    "Public Profiles",
  ],
  ["Create", "Get", "Search", "Count", "Stats", "Update", "Delete"]
);

// Global Payment Gateway Manager
export const GatewayManager = new PaymentGatewayManager({
  Stripe: {
    credentials: {
      Live: {
        PK: "pk_live_...",
        SK: "sk_live_...",
      },
      Test: {
        PK: "pk_test_...",
        SK: "sk_test_...",
      },
    },
  },
  Paypal: {
    credentials: {
      Live: {
        PK: "...",
        SK: "...",
      },
      Test: {
        PK: "...",
        SK: "...",
      },
    },
  },
});

export const Configuration = new (class {
  // Global Configuration
  public global = () => ({
    // If Enabled, Application will give Error Stacks for Errors on the requests
    DEBUGING: process.env.NODE_ENV === "development",

    // Package Information
    PACKAGE: require(Path.join(
      process.cwd(),
      "package.json"
    )) as PackageInterface,

    // Application Configuration
    APP: {
      publicDir: "./public/",
      uploads: {
        directory: "./uploads/",
        allowedMimeTypes: [
          // Images
          "image/png",
          "image/jpg",
          "image/jpeg",
          "image/webp",
          "image/pipeg",
          "image/bmp",
          "image/gif",
          "image/svg+xml",
          "image/tiff",
          "image/x-icon",
          "image/x-rgb",
          "image/ief",
          "image/vnd.microsoft.icon",

          // Archives
          "application/zip",
          "application/x-7z-compressed",
          "application/vnd.rar",

          // Documents
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-powerpoint",
          "application/vnd.visio",
          "application/msword",
          "application/pdf",
          "application/rtf",
          "text/plain",
          "text/csv",
        ],
        allowedFileSize: 2e6, // 2 MB
      },
    },
  });

  // Development Configuration
  public development = () => ({
    // Users Configuration
    USERS: {
      default: "root",
      subscription: {
        type: "Email" as "Email" | "Contact",
      },
      tokens: {
        authorization: {
          expiry: 86400, // 1 Day
        },
      },
      permissions: {
        // Permissions used if no Authorization Token provided.
        unauthenticated: PermissionsManager.createPermissions({
          // Core Permissions
          Auth: ["Create"],
          Users: ["Create", "Get"],
        }),

        // Permissions used if Authorization Token has been provided.
        authenticated: PermissionsManager.createPermissions({
          // Core Permissions
          Auth: ["Update", "Delete"],
          Users: ["Create", "Get"],
          Notifications: ["Search", "Get"],
          Profiles: ["Get", "Update"],
        }),
      },
    },

    // Database Connection
    DATABASE: {
      connection: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "test",
      },
      options: {
        sync: false,
        logs: true,
      },
    },

    // Request & Data Security
    SECURITY: {
      encryption: {
        key: "8vkPiniMBXbplMvD2TanI8pytfEEaDtN",
      },
      ip: {
        enabled: true,
        allowedIps: ["127.0.0.1", "::1"],
        filterMode: "allow" as "allow" | "deny",
        logLevel: "all" as "all" | "allow" | "deny",
        excludeRoutes: [],
      },
    },

    LANGUAGES: require(Path.join(
      process.cwd(),
      "./src/configuration/languages.json"
    )) as LanguageInterface[],

    CURRENCIES: require(Path.join(
      process.cwd(),
      "./src/configuration/currencies.json"
    )) as CurrencyInterface[],
  });

  // Production Configuration
  public production = () =>
    ConfigManagerUtils.deepMerge(this.development(), {
      // Development Configuration Overrides

      // Database Connection
      DATABASE: {
        connection: {
          host: "localhost",
          port: 3306,
          user: "root",
          password: "",
          database: "test",
        },
        options: {
          sync: false,
          logs: false,
        },
      },
    });

  public export = () => ({
    ...this.global(),
    ...this[(process.env.NODE_ENV || "production") as "production"](),
  });
})().export;
