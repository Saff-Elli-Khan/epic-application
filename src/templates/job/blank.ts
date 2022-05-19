/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */

/* @ImportsContainer */
/* /ImportsContainer */

import { DatabaseDriver, Schedule } from "@App/exports";
import { DatabaseSession } from "@oridune/epic-odm";

// Start Sample Cron Job
export const SampleJob = () =>
  Schedule.task("Sample", "0 0 * * *", async (info) => {
    // You can perform database operations. (optionally)
    // Create Database Session
    const Database = await new DatabaseSession(DatabaseDriver).start();

    // Do something very important (Every day at 00:00)...
    console.log("Sample job has been executed:", info);
  });
