const request = require("supertest");
const app = require("../src/app");
const connectDB = require("../src/config/db");
const mongoose = require("mongoose");
const Token = require("../src/models/token-model");

describe("Auth Flow", () => {
  let server;
  let testUser;
  let accessToken;
  let refreshToken;

  beforeAll(async () => {
    server = app.listen(0);
    await connectDB();
    await mongoose.connection.dropDatabase();
  });

  afterAll(async () => {
    await server.close();
    await mongoose.connection.close();
  });

  it("registers a new user", async () => {
    testUser = {
      email: `user${Date.now()}@example.com`,
      password: "test123",
    };

    const res = await request(server).post("/api/auth/register").send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");

    accessToken = res.body.accessToken;
    refreshToken = res.body.refreshToken;
  });

  it("prevents duplicate registration", async () => {
    const res = await request(server).post("/api/auth/register").send(testUser);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/already exists/i);
  });

  it("logs in an existing user", async () => {
    const res = await request(server).post("/api/auth/login").send(testUser);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");
  });

  it("denies login with wrong password", async () => {
    const res = await request(server).post("/api/auth/login").send({
      email: testUser.email,
      password: "wrongpassword",
    });
    expect(res.statusCode).toBe(401);
  });

  it("allows access to protected route with valid token", async () => {
    const res = await request(server)
      .get("/api/users/profile")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("email");
  });

  it("denies access to protected route without token", async () => {
    const res = await request(server).get("/api/users/profile");
    expect(res.statusCode).toBe(401);
  });
});
