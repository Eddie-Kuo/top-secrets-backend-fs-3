const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
// agent is a part of supertest that allows us to make and store cookies for a period of time
// so that we can have a logged in user for a series of tests

describe('user routes', () => {
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

  test('/POST /api/v1/users/sessions signs in user', async () => {
    await request(app).post('/api/v1/users').send(mockUser);
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email: mockUser.email, password: mockUser.password });
    expect(res.status).toEqual(200);
  });

  test('GET /api/v1/secrets', async () => {
    const agent = request.agent(app);
    await agent.post('/api/v1/users').send(mockUser);
    // creating a user
    await agent
      .post('/api/v1/users/sessions')
      .send({ email: mockUser.email, password: mockUser.password });
    // signing in a user
    // then showing the user details
    const res = await agent.get('/api/v1/secrets');
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      description: expect.any(String),
      createdAt: expect.any(String),
    });
    // for this test since we're using the agent we're awaiting the request from the agent instead of the actual app
    // line 43 - agent is creating a mocked version of the app that we can then use for the rest of the test
    // using app vs agent comes down to whether or not you need to be logged in for a period of time or not
  });

  test('/DELETE /api/v1/users/sessions logs out the user', async () => {
    const agent = request.agent(app);

    const user = await UserService.create({ ...mockUser });
    await agent
      .post('/api/v1/users/sessions')
      .send({ email: user.email, password: user.password });
    const res = await agent.delete('/api/v1/users/sessions');
    expect(res.status).toEqual(204);
  });

  afterAll(() => {
    pool.end();
  });
});
