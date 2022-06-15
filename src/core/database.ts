import { MongoDBDriver } from "@oridune/epic-odm";
import { LoadModules } from "./helpers";

// Create Database Driver
export const DatabaseDriver = new MongoDBDriver(
  LoadModules("model"),
  process.env.DATABASE_URL || "mongodb://localhost:27017/test",
  {},
  process.env.NODE_ENV === "development"
);
