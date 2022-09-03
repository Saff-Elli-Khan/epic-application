import { DatabaseAdapter } from "@App/exports";
import { DatabaseSession } from "@oridune/epic-odm";

// Start Sample Job
export const SampleJob = async () => {
  // You can perform database operations. (optionally)
  // Create Database Session
  const Database = await new DatabaseSession(DatabaseAdapter).start();

  // Do something on start...
  console.log("Sample job has been executed!");

  // Make sure to end the database session!
  await Database.end();
};
