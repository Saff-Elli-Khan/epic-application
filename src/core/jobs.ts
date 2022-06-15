import { LoadModules } from "./helpers";

// Create Jobs Executer
export const ExecuteJobs = async () => {
  // Execute each individule job in series.
  for (const Job of LoadModules("job")) await Job();
};
