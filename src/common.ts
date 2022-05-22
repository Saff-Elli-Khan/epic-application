import { Configuration } from "./exports";

/** State of the application */
export const IsPlugin =
  !!Configuration.plugins[require("../package.json").name];

/** Application's local settings */
export const Locals: Record<string, any> =
  Configuration.plugins[require("../package.json").name]?.locals ||
  Configuration.locals;
