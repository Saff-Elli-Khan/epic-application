import { DatabaseDriver } from "@App/exports";
import { DatabaseSession } from "@oridune/epic-odm";

// Start Sample Job
export const SampleJob = async () => {
  // You can perform database operations. (optionally)
  // Create Database Session
  const Database = await new DatabaseSession(DatabaseDriver).start();

  // Do something on start...
  console.log("Sample job has been executed!");
};
