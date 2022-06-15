import Path from "path";
import { HTTPServer } from "./server";

// Load Environment Variables
require("dotenv").config({
  path: Path.join(process.cwd(), `./env/.${process.env.NODE_ENV}.env`),
});

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
