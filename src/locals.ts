import { Configuration } from "./exports";

/** Application's Local Settings */
export const Settings: Record<string, any> =
  Configuration.other[require("../package.json").name];
