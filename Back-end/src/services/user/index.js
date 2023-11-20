const router = require('express').Router();

const User = require('../../models/user');
const jwt = require('../../utils/jwt');

router.get("/user", jwt.authenticateToken, async (req, res, next) => {
  const { id } = req.query;

  if (id && !id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(409).send('Invalid id');
  }

  if (id && !(await User.findById(id))) {
    return res.status(409).send('No user at this id');
  }

  res.send(!id ? await User.find() : await User.findById(id));
});

router.post("/user", async (req, res, next) => {
  const { username, email, password, telephone } = req.body;
  const user = new User({ username, email, password, telephone });

  if ((await User.find({ username })).length) {
    return res.status(409).send('Username already used');
  }

  if ((await User.find({ email })).length) {
    return res.status(409).send('email already used');
  }

  if ((await User.find({ telephone })).length) {
    return res.status(409).send('telephone already used');
  }

  await user.save();
  return res.send();
});

router.delete("/user", jwt.authenticateToken, async (req, res, next) => {
  const { id } = req.query;

  if (!id) {
    return res.status(409).send('missing id');
  }

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(409).send('Unvalid id');
  }

  if (!(await User.findById(id))) {
    return res.status(409).send('No user at this id');
  }

  const user = await User.findById(id);

  await user.delete(id);

  res.send();
});

router.put("/user/:id", jwt.authenticateToken, async (req, res, next) => {
  const { id } = req.params;
  const { username, email, password, telephone } = req.body;

  if (!id || (id && !id.match(/^[0-9a-fA-F]{24}$/))) {
    return res.status(409).send({ message: 'Id is missing or invalid' });
  }

  let user = await User.findById(id);

  if (!user) {
    return res.status(409).send({ message: 'No user found at this id' });
  }

  user = await User.findOneAndUpdate({ _id: id }, {
    $set: { username: username, email: email, password: password, telephone: telephone }
  } ,{ new : true, omitUndefined : true });

   res.send(await jwt.generateToken(user));
});

module.exports = router;
