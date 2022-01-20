/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */

import { getModelsManager } from "@saffellikhan/epic-orm";
/* @ImportsContainer */
/* /ImportsContainer */

// Start Sample Job
export const SampleJob = async () => {
  // You can optionally perform database operations using Global Models Manager Instance
  // Get Global Database Models Manager
  const Database = getModelsManager();

  // Do something on start...
  console.log("Sample job has been executed!");
};
