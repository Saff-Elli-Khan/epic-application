import { OK } from "http-status";

describe("Test API Home", () => {
  it(`GET /api/ APIHome returns http status ${OK}`, async () => {
    const { statusCode } = await global.supertest.get("/api/");
    expect(statusCode).toBe(OK);
  });
});
