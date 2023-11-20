const User = require('../../src/models/user');

const clearUserCollection = (done) => {
  User.deleteMany({}, (err) => {
    if (err) return done(err);
    done();
  });
}

const createUser = (done) => {
  const email = 'test@test.fr';
  const password = 'password';
  const telephone = '0123456798';
  const username = 'username';
  User.create({ username, email, password, telephone }, (err) => {
    if (err) return done(err);
    done();
  });
}

module.exports = { createUser, clearUserCollection }
