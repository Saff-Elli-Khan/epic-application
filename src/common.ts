import { Configuration } from "./exports";

/** Current App Name */
export const AppName = require("../package.json").name;

/** State of the application */
export const IsPlugin = !!Configuration.plugins[AppName];

/** Application's local settings */
export const Locals: Record<string, any> =
  Configuration.plugins[AppName]?.locals || Configuration.locals;
