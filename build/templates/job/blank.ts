import { DatabaseAdapter, Schedule } from "@App/exports";
import { DatabaseSession } from "@oridune/epic-odm";

// Start Sample Cron Job
export const SampleJob = () =>
  Schedule.task("Sample", "0 0 * * *", async (info) => {
    // You can perform database operations. (optionally)
    // Create Database Session
    const Database = await new DatabaseSession(DatabaseAdapter).start();

    // Do something very important (Every day at 00:00)...
    console.log("Sample job has been executed:", info);

    // Make sure to end the database session!
    await Database.end();
  });
