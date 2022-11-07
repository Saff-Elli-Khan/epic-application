import { NODE_ENV } from "@App/common";
import { MongoDBAdapter } from "@oridune/epic-odm";
import { LoadModules } from "./helpers/loaders";

// Create Database Adapter
export const DatabaseAdapter = new MongoDBAdapter(
  LoadModules("model"),
  process.env.DATABASE_URL ||
    "mongodb://localhost:27017/" + process.env.NODE_ENV,
  { logs: process.env.NODE_ENV !== NODE_ENV.PRODUCTION }
);
