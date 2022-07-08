describe("Test API Home", () => {
  it("GET /api/ APIHome returns http status 200", async () => {
    const { statusCode } = await global.supertest.get("/api/");
    expect(statusCode).toEqual(200);
  });
});
