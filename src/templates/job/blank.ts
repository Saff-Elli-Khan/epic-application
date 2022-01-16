/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */

import { Schedule } from "@AppPath/exports";
import { getModelsManager } from "@saffellikhan/epic-orm";
/* @ImportsContainer */
/* /ImportsContainer */

// Start Sample Cron Job
export const SampleJob = () =>
  Schedule.task("Sample", "0 0 * * *", async (info) => {
    // You can optionally perform database operations using Global Models Manager Instance
    // Get Global Database Models Manager
    const Database = getModelsManager();

    // Do something very important (Every day at 00:00)...
    console.log("Sample job has been executed:", info);
  });
