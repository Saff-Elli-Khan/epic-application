import "./loadEnv";
import { ExecuteJobs } from "./jobs";
import { HTTPServer } from "./server";
import { DatabaseAdapter } from "./database";

(async () => {
  // Sync Database in Development
  if (process.env.NODE_ENV === "development") await DatabaseAdapter.sync();

  // Start Executing Jobs
  await ExecuteJobs();

  // Start Application Server
  await HTTPServer.listen(process.env.PORT || 3742);
})();
