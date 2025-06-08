const request = require('supertest');
const app = require('../src/app');
const db = require('../src/database'); // assuming db exports the pg pool

afterAll(async () => {
  await db.pool.end(); // close PostgreSQL connection
});


describe('Auth Routes', () => {
  it('should fail login with wrong credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'fake@example.com',
      password: 'wrong',
    });
    expect(res.statusCode).toBe(401);
  });
});
