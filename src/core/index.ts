import { DatabaseDriver } from "./database";
import { ExecuteJobs } from "./jobs";
import { HTTPServer } from "./server";

(async () => {
  // Create a Database Connection
  await DatabaseDriver.startUp();

  // Start Executing Jobs
  await ExecuteJobs();

  // Start Application Server
  await HTTPServer.listen(process.env.PORT || 3742);
})();
