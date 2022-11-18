const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

// create a mock user with all the user's data that we want
const mockUser = {
  firstName: 'first',
  lastName: 'last',
  email: 'user@testing.com',
  password: '123456',
};

// create a function that signs in a user so that we can use it for testing
const testingUser = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;

  // the agent gives us the ability to store cookies for each request per test
  const agent = request.agent(app);

  // create a user that we can sign in with
  // set up the user service file in order for us to create the user
  // this file will also be in charge of signing in the user
  const user = await UserService.create({ ...mockUser, ...userProps });
  // sign in
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

// now with the tests we can use the agent and mock user to test the routes

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  // testing route to make sure user is able to log in
  test('/POST adds a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    // destructure mock user to expect the same values from mock user
    const { firstName, lastName } = mockUser;
    expect(res.body).toEqual({
      firstName,
      lastName,
    });
  });

  afterAll(() => {
    pool.end();
  });
});
