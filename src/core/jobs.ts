import { Schedule } from "./schedular";
import { LoadModules } from "./helpers/loaders";

// Create Jobs Executer
export const ExecuteJobs = async () => {
  // Initialize Jobs Schedular
  await Schedule.init();

  // Resolve Jobs
  const Jobs = await Promise.all(LoadModules("job"));

  // Execute each individule job in series.
  for (const Job of Jobs) await Job?.();
};
