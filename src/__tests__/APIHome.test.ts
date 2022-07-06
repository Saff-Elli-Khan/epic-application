describe("Test API Home", () => {
  it("Should return http status 200", async () => {
    const { statusCode } = await global.supertest.get("/api/");
    expect(statusCode).toEqual(200);
  });
});
