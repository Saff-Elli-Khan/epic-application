/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <JobTemplate> await {{ job }}(); </JobTemplate> */

/* @ImportsContainer */
/* /ImportsContainer */

import { ImportJobs } from "./imports";

// Create Cron Jobs Initializer
export const InitializeCronJobs = async () => {
  await ImportJobs();

  /* @JobsContainer */
  /* /JobsContainer */
};
