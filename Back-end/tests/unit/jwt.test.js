const { expect } = require('chai');

const jwt = require('../../src/utils/jwt');

describe("JWT Utils Functions", () => {
  describe('Generate Token', () => {
    it('Should generate a JWT token', (done) => {
      const user = {
        username: "username",
        email: "email@email.fr"
      };
      jwt.generateToken(user).then(res => {
        expect(res).to.be.a('string');
        expect(res).to.have.text('ey');
      });
     done();
    });
  });

  /* 2021-10-21 WIP Test Middleware */
  // describe('Authenticate Token', () => {
  //   it('Should authenticate a JWT token (middleware)', (done) => {
  //     const req = {
  //       headers: {
  //         authorization: 'Bearer '
  //       }
  //     };
  //     done();
  //   });
  // });
});
