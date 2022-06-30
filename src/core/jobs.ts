import { Schedule } from "./globals";
import { LoadModules } from "./helpers";

// Create Jobs Executer
export const ExecuteJobs = async () => {
  // Initialize Jobs
  await Schedule.init();

  // Execute each individule job in series.
  for (const Job of LoadModules("job")) await Job();
};
