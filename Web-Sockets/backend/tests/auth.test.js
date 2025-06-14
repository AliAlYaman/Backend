const request = require("supertest");
const app = require("../src/app.js");

describe("Auth Routes", () => {
  it("should return 404 for unknown route", async () => {
    const res = await request(app).get("/api/unknown");
    expect(res.statusCode).toBe(404);
  });
});
