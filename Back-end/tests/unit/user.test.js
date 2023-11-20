const { expect } = require('chai');

const User = require('../../src/models/user');

describe('User Model Test Suite', () => {
  it('Should throw errors if fields are missing', (done) => {
    const user = new User();
    user.validate(function (err) {
      expect(err.errors.username).to.exist;
      expect(err.errors.email).to.exist;
      expect(err.errors.telephone).to.exist;
      done();
    });
  });

  it('Should return user hook', (done) => {
    const user = new User({
      username: 'username',
      email: 'email@email.com',
      telephone: '0123456789',
      password: 'bonjour'
    });
    expect(user.toPublic()).to.have.property('id');
    expect(user.toPublic()).to.have.property('username');
    expect(user.toPublic()).to.have.property('telephone');
    done();
  });

  /* 2021-10-21 WIP Test User save pre hook Middleware */
  // it('Should use the pre hook on save (hash password)', (done) => {
  //   const user = new User({
  //     username: 'username',
  //     email: 'email@email.com',
  //     telephone: '0123456789',
  //     password: 'bonjour'
  //   });
  //   expect(user.save()).to.be.a('')
  //   done()
  // });
});