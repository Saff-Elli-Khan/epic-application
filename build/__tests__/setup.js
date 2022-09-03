"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../core/loadEnv");
const exports_1 = require("../exports");
const epic_odm_1 = require("@oridune/epic-odm");
const supertest_1 = require("supertest");
beforeAll(async () => {
  // Sync Database Schema
  await exports_1.DatabaseAdapter.sync(); // You can disable this line if you don't want to sync repeatedly.
  // Prepare Application for Testing
  await exports_1.HTTPServer.prepare();
  // Create Global Accessors
  global.database = await new epic_odm_1.DatabaseSession(
    exports_1.DatabaseAdapter
  ).start();
  global.supertest = (0, supertest_1.agent)(
    exports_1.HTTPServer.Application.Framework
  );
});
afterAll(async () => {
  // Close Database Session
  await global.database.end();
  // Disconnect Database
  await exports_1.DatabaseAdapter.disconnect(); // You can pass true as the first parameter if you want to cleanup the database.
});
