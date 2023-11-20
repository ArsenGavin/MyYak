const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../server');

chai.use(chaiHttp);

describe('Error Service Suite', () => {
  describe('404 errors', () => {
    it('Should throw new 404 error', (done) => {
      chai.request(server).get('/fake-url').end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(404);
        expect(res.error.text).to.contain("Cannot GET /fake-url");
        expect(res.body).to.be.an('object');
        done();
      });
    });
  });
});

