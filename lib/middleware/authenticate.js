// checks for the session cookie and verify its contents
// uses json web token then assigns the payload to req.user
const jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
  try {
    const cookie = req.cookies && req.cookies[process.env.COOKIE_NAME];
    if (!cookie) throw new Error('You must sign in to continue');

    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};
