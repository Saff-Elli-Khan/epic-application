/**
 * IMPORTANT NOTE: Imports from core should always be done from the "./exports" module!
 * Direct import from core folder would break the plugins flow!
 */

import Path from "path";

/** Available Environments */
export enum NODE_ENV {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
  TEST = "test",
}

// Inject Environment Variables into objects
export const InjectEnv = <T extends Record<string, any>>(object: T): T => {
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

/** Current App Name */
export const AppName = require(Path.join(process.cwd(), "./package.json")).name;

/** Current Repository Name */
export const RepositoryName = require("../package.json").name;

/** State of the application */
export const IsPlugin = !!Configuration.plugins[RepositoryName];

/** Application's local settings */
export const Locals: Record<string, any> =
  Configuration.plugins[RepositoryName]?.locals || Configuration.locals;
