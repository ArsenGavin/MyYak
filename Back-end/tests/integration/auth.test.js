const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../server');
const { createUser, clearUserCollection } = require('../helper/user');

chai.use(chaiHttp);

describe('Authentication Service Suite', () => {
  describe('Register User', () => {
    before((done) => { clearUserCollection(done) });
    after((done) => { clearUserCollection(done) });

    it('Should return a JWT token (registration)', (done) => {
      const email = 'test@test.fr';
      const password = 'password';
      const telephone = '0123456798';
      const username = 'username';
      chai.request(server)
        .post('/register')
        .send({ username, email, password, telephone })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('Should throw an error if registered user is incorrect', (done) => {
      const email = 'email@email.fr';
      chai.request(server)
        .post('/register')
        .send(email)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(422);
          done();
        });
    });
  });

  describe('Login User', () => {
    before((done) => { createUser(done) });
    after((done) => { clearUserCollection(done) });

    it('Should return a JWT token (login)', (done) => {
      const email = 'test@test.fr';
      const password = 'password';
      chai.request(server)
        .post('/login')
        .send({ email, password })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('Should throw an error if logged in user is incorrect', (done) => {
      const password = 'password';
      chai.request(server)
        .post('/login')
        .send(password)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(422);
          expect(res.error.text).to.equal('Email or password missing');
          done();
        });
    });
  });
});
