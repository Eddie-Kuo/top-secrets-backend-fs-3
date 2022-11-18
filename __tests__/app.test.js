const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  // create a mock user with all the user's data that we want
  const mockUser = {
    firstName: 'first',
    lastName: 'last',
    email: 'user@testing.com',
    password: '123456',
  };
  // testing route to make sure user is able to log in
  test('/POST /api/v1/users adds a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    // destructure mock user to expect the same values from mock user
    const { firstName, lastName, email } = mockUser;
    expect(res.body).toEqual({
      id: expect.any(String),
      firstName,
      lastName,
      email,
    });
  });

  afterAll(() => {
    pool.end();
  });
});
