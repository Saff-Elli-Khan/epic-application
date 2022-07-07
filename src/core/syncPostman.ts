import "./loadEnv";
import { HTTPServer } from "./server";

/**
 * Sync your Postman with the current routes of this application.
 * Make sure you have added the required credentials to the environment variables.
 * Execute the following script with "npm run sync:postman"
 *
 */
HTTPServer.Application.syncPostman({
  apiKey: process.env.POSTMAN_API_KEY || "",
  collectionId: process.env.POSTMAN_COLLECTION_ID || "",
  collectionName: process.env.POSTMAN_COLLECTION_NAME || "",
  disabled: !process.env.POSTMAN_API_KEY,
}).then(() => console.log("Postman Syncronization Successful!"));
