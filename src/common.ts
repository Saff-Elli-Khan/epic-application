/**
 * IMPORTANT NOTE: Imports from core should always be done from the "./exports" module!
 * Direct import from core folder would break the plugins flow!
 */

import Path from "path";
import { Configuration } from "./exports";

/** Available Environments */
export enum NODE_ENV {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
  TEST = "test",
}

/** Current App Name */
export const AppName = require(Path.join(process.cwd(), "./package.json")).name;

/** Current Repository Name */
export const RepositoryName = require("../package.json").name;

/** State of the application */
export const IsPlugin = !!Configuration.plugins[RepositoryName];

/** Application's local settings */
export const Locals: Record<string, any> =
  Configuration.plugins[RepositoryName]?.locals || Configuration.locals;
