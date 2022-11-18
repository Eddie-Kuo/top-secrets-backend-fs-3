const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// need the user model to insert when creating a user/ or get user by email
const { User } = require('../models/User');

module.exports = class UserService {
  static async create({ firstName, lastName, email, password }) {
    //create the password hash with bcrypt so we don't store the password as plain text
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    // insert data into the user model once we've encrypted the password into password hash
    const user = await User.insert({
      firstName,
      lastName,
      email,
      passwordHash,
    });
    return user;
  }
};
