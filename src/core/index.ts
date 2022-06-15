import { DatabaseDriver } from "./database";
import { Schedule } from "./globals";
import { ExecuteJobs } from "./jobs";
import { HTTPServer } from "./server";

(async () => {
  // Create a Database Connection
  await DatabaseDriver.startUp();

  // Initialize Jobs
  await Schedule.init();

  // Start Executing Jobs
  await ExecuteJobs();

  // Start Application Server
  await HTTPServer.listen(process.env.PORT || 3742);
})();
