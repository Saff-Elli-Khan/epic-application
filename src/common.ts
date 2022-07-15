import Path from "path";
import { Configuration } from "./exports";

/** Current App Name */
export const AppName = require(Path.join(process.cwd(), "./package.json")).name;

/** Current Repository Name */
export const RepositoryName = require("../package.json").name;

/** State of the application */
export const IsPlugin = !!Configuration.plugins[RepositoryName];

/** Application's local settings */
export const Locals: Record<string, any> =
  Configuration.plugins[RepositoryName]?.locals || Configuration.locals;
