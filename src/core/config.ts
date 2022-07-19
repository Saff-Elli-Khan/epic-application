import Path from "path";
import { InjectEnv } from "./helpers/utils";

// Get Epic Configuration
export const Configuration = InjectEnv(
  require(Path.join(process.cwd(), "./package.json")).epic || {}
);
