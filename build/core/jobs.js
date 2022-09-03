"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecuteJobs = void 0;
const schedular_1 = require("./schedular");
const loaders_1 = require("./helpers/loaders");
// Create Jobs Executer
const ExecuteJobs = async () => {
  // Initialize Jobs Schedular
  await schedular_1.Schedule.init();
  // Resolve Jobs
  const Jobs = await Promise.all((0, loaders_1.LoadModules)("job"));
  // Execute each individule job in series.
  for (const Job of Jobs)
    await (Job === null || Job === void 0 ? void 0 : Job());
};
exports.ExecuteJobs = ExecuteJobs;
