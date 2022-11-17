const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
// const request = require('supertest');
// const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  // create a mock user with all the user's data that we want

  // create a variable of the registered and logged in user?
  //* asynchronous - pass in userProps as an empty object
  // here we can create an agent that allows us to store cookies between each request in a test
  // then create a user to sign in with
  //* user = await user service .create({spread operator of mock and userProps})
  // sign in by sending email and password
  // return the agent and user

  // now with the tests we can use the agent and mock user to test the routes

  afterAll(() => {
    pool.end();
  });
});
