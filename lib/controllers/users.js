// userService will now be the middleman between the controller and the models
// need to calculate one day in milliseconds for the time out

const { Router } = require('express');
const UserService = require('../services/UserService');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const user = await UserService.create(req.body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});
