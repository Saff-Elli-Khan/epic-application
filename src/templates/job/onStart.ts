import { DatabaseAdapter } from "@App/exports";
import { DatabaseSession } from "@oridune/epic-odm";

// Note: Jobs are never executed in the test environment! Please import the specific jobs into your test environment manually.
// Start Sample Job
export const SampleJob = async () => {
  // You can perform database operations. (optionally)
  // Create Database Session
  const Database = await new DatabaseSession(DatabaseAdapter).start();

  // Do something on start...
  console.log("Sample job has been executed!");
};
