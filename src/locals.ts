import { Configuration } from "./exports";

/** Application's Local Settings */
export const Locals: Record<string, any> =
  Configuration.plugins?.[require("../package.json").name]?.locals || {};
