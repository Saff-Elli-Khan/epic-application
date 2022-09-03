"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = require("http-status");
describe("Test API Home", () => {
  it(`GET /api/ APIHome returns http status ${http_status_1.OK}`, async () => {
    const { statusCode } = await global.supertest.get("/api/");
    expect(statusCode).toBe(http_status_1.OK);
  });
});
