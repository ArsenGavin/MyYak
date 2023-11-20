const jwt = require('jsonwebtoken');
const { decode } = require('jsonwebtoken');


const generateToken = async (user) => {
  return jwt.sign({
    id: user._id,
    username: user.username,
    email: user.email,
    telephone: user.telephone,
  }, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
}

const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.sendStatus(401);
    }
  });

  req.authenticatedUser = decode(token);
  next();
}

module.exports = {
  generateToken,
  authenticateToken
}
