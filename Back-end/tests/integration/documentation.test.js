const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../server');

chai.use(chaiHttp);

describe('Documentation Service Suite', () => {
  describe('Get the Swagger Documentation', () => {
    it('Should return the Swagger Documentation page', (done) => {
      chai.request(server).get('/swagger').end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.text).to.contain('swagger-ui');
        expect(res.header['content-type']).to.have.string('text/html');
        done();
      });
    });
  });
});