import { DatabaseDriver, Schedule } from "./globals";
import { ExecuteJobs } from "./jobs";
import { Server } from "./server";

(async () => {
  // Create a Database Connection
  await DatabaseDriver.connect();

  // Initialize Jobs
  await Schedule.init();

  // Start Executing Jobs
  await ExecuteJobs();

  // Start Application Server
  await Server.listen(process.env.PORT || 3742);
})();
