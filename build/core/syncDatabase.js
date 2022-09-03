"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./loadEnv");
const database_1 = require("./database");
/**
 * Sync your Database with the available models.
 * Make sure you have added the required credentials to the environment variables.
 * Execute the following script with "npm run sync:db:dev" or "npm run sync:db:prod"
 *
 */
database_1.DatabaseAdapter.sync().then(async () => {
  console.log("Database Syncronization Successful!");
  // Disconnect
  await database_1.DatabaseAdapter.disconnect();
  // Exit Current Process
  process.exit();
});
