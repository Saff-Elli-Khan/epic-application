import { DatabaseSession } from "@oridune/epic-odm";
import { HTTPServer } from "@App/core/server";
import { DatabaseAdapter } from "@App/exports";
import { agent as SupertestAgent } from "supertest";

beforeAll(async () => {
  // Sync Database Schema
  await DatabaseAdapter.sync(); // You can disable this line if you don't want to sync repeatedly.

  // Prepare Application for Testing
  await HTTPServer.prepare();

  // Create Global Accessors
  global.database = await new DatabaseSession(DatabaseAdapter).start();
  global.supertest = SupertestAgent(HTTPServer.Application.Framework);
});

afterAll(async () => {
  // Close Database Session
  await global.database.end();

  // Disconnect Database
  await DatabaseAdapter.disconnect(); // You can pass true as the first parameter if you want to cleanup the database.
});
