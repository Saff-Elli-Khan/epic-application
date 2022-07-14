import "./loadEnv";
import { DatabaseAdapter } from "./database";

/**
 * Sync your Database with the available models.
 * Make sure you have added the required credentials to the environment variables.
 * Execute the following script with "npm run sync:db:dev" or "npm run sync:db:prod"
 *
 */

DatabaseAdapter.sync().then(async () => {
  console.log("Database Syncronization Successful!");

  // Disconnect
  await DatabaseAdapter.disconnect();

  // Exit Current Process
  process.exit();
});
