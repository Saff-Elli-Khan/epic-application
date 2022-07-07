import "./loadEnv";
import { ExecuteJobs } from "./jobs";
import { HTTPServer } from "./server";

(async () => {
  // Start Executing Jobs
  await ExecuteJobs();

  // Start Application Server
  await HTTPServer.listen(process.env.PORT || 3742);
})();
