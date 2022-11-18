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

  static async signIn({ email, password = '' }) {
    try {
      const user = await User.getByEmail(email);
      if (!user) throw new Error('invalid email');
      if (!bcrypt.compareSync(password, user.passwordHash))
        throw new Error('invalid password');
      //compare sync is a built in method

      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      return token;
    } catch (e) {
      e.status = 401;
    }
  }
};
