import { DatabaseSession } from "@oridune/epic-odm";
import { HTTPServer } from "@App/core/server";
import { DatabaseDriver } from "@App/exports";
import { agent as SupertestAgent } from "supertest";

beforeAll(async () => {
  // Create a Database Connection
  await DatabaseDriver.startUp();

  // Prepare Application for Testing
  await HTTPServer.prepare();

  // Create Global Accessors
  global.database = await new DatabaseSession(DatabaseDriver).start();
  global.supertest = SupertestAgent(HTTPServer.Application.Framework);
});

afterAll(async () => {
  // Close Database Session
  await global.database.end();

  // Disconnect Database
  await DatabaseDriver.disconnect(); // You can pass true as the first parameter if you want to cleanup the database.
});
