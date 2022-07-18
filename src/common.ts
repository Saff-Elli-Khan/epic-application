import Path from "path";
import { InjectEnv } from "./core/helpers/utils";

/** Available Environments */
export enum NODE_ENV {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
  TEST = "test",
}

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
