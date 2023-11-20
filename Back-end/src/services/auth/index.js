const router = require('express').Router();
const User = require('../../models/user');
const jwt = require('../../utils/jwt');
const bcrypt = require('../../utils/bcrypt');

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send('Email or password missing');
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(403).send('Invalid credentials.');
  }
  const isPasswordValid = bcrypt.comparePassword(password, user.password);
  if (!isPasswordValid) {
    return res.status(403).send('Invalid credentials.');
  }

  return res.status(200).send(await jwt.generateToken(user));
});

router.post('/register', async (req, res, next) => {
  const { email, password, telephone, username } = req.body;

  if (!email || !password || !telephone || !username) {
    return res.status(422).send('Arguments missing from query');
  }

  const existUsername = await User.findOne({ username });

  if (existUsername) {
    return res.status(409).send('Username already used');
  }

  const existEmail = await User.findOne({ email });

  if (existEmail) {
    return res.status(409).send('Email already used');
  }

  const existTelephone = await User.findOne({ telephone });

  if (existTelephone) {
    return res.status(409).send('Telephone already used');
  }

  // TODO: call the service to verify the phone number

  const user = await User.create({ email, password, telephone, username });

  return res.status(200).send(await jwt.generateToken(user));
});

module.exports = router;
