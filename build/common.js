"use strict";
/**
 * IMPORTANT NOTE: Imports from core should always be done from the "./exports" module!
 * Direct import from core folder would break the plugins flow!
 */
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Locals =
  exports.IsPlugin =
  exports.RepositoryName =
  exports.AppName =
  exports.Configuration =
  exports.InjectEnv =
  exports.DefaultCorsConfiguration =
  exports.NODE_ENV =
    void 0;
const path_1 = __importDefault(require("path"));
// Available Environments
var NODE_ENV;
(function (NODE_ENV) {
  NODE_ENV["DEVELOPMENT"] = "development";
  NODE_ENV["PRODUCTION"] = "production";
  NODE_ENV["TEST"] = "test";
})((NODE_ENV = exports.NODE_ENV || (exports.NODE_ENV = {})));
// Default Cors Configuration
exports.DefaultCorsConfiguration = {
  origin:
    (_a = process.env.CORS_ALLOW_ORIGIN) === null || _a === void 0
      ? void 0
      : _a.split(",").map((item) => item.trim()),
  allowedHeaders:
    (_b = process.env.CORS_ALLOW_HEADERS) === null || _b === void 0
      ? void 0
      : _b.split(",").map((item) => item.trim()),
  credentials: ["true", "1"].includes(process.env.CORS_ALLOW_CREDENTIALS || ""),
  exposedHeaders:
    (_c = process.env.CORS_EXPOSED_HEADERS) === null || _c === void 0
      ? void 0
      : _c.split(",").map((item) => item.trim()),
  methods:
    (_d = process.env.CORS_ALLOW_METHODS) === null || _d === void 0
      ? void 0
      : _d.split(",").map((item) => item.trim()),
  preflightContinue: ["true", "1"].includes(
    process.env.CORS_PREFLIGHT_CONTINUE || ""
  ),
};
// Inject Environment Variables into objects
const InjectEnv = (object) => {
  for (const Key in object) {
    // Get Value
    const Value = object[Key];
    if (typeof Value === "string") {
      // Resolve if value is an Object
      const MatchObject =
        /(object|boolean|number|string|list)\(\s*\{\s*\{\s*(\w+)\s*\}\s*\}\s*\)/.exec(
          Value
        );
      if (MatchObject) {
        if (MatchObject[1] === "object")
          object[Key] = JSON.parse(process.env[MatchObject[2]] || "{}");
        else if (MatchObject[1] === "boolean")
          object[Key] = ["1", "true"].includes(
            (process.env[MatchObject[2]] || "").toString().toLowerCase()
          );
        else if (MatchObject[1] === "number")
          object[Key] = parseFloat(process.env[MatchObject[2]] || "");
        else if (MatchObject[1] === "string")
          object[Key] = process.env[MatchObject[2]];
        else if (MatchObject[1] === "list")
          object[Key] = (process.env[MatchObject[2]] || "")
            .split(",")
            .map((_) => _.trim());
        else
          object[Key] = Value.replace(
            /\{\s*\{\s*(\w+)\s*\}\s*\}/g,
            (_, key) => process.env[key]
          );
      } else
        object[Key] = Value.replace(
          /\{\s*\{\s*(\w+)\s*\}\s*\}/g,
          (_, key) => process.env[key]
        );
    } else if (typeof Value === "object" && Value !== null)
      object[Key] = (0, exports.InjectEnv)(Value);
  }
  return object;
};
exports.InjectEnv = InjectEnv;
// Get Epic Configuration
exports.Configuration = (0, exports.InjectEnv)(
  require(path_1.default.join(process.cwd(), "./package.json")).epic || {}
);
// Current App Name
exports.AppName = require(path_1.default.join(
  process.cwd(),
  "./package.json"
)).name;
// Current Repository Name
exports.RepositoryName = require("../package.json").name;
// State of the application
exports.IsPlugin = !!exports.Configuration.plugins[exports.RepositoryName];
// Application's local settings
exports.Locals =
  ((_e = exports.Configuration.plugins[exports.RepositoryName]) === null ||
  _e === void 0
    ? void 0
    : _e.locals) || exports.Configuration.locals;
