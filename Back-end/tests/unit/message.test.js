const { expect } = require('chai');

const Message = require('../../src/models/message');

describe('Message Model Test Suite', () => {
  it('Should throw errors if fields are missing', (done) => {
    const message = new Message();
    message.validate(function (err) {
      expect(err.errors.content).to.exist;
      done();
    });
  });
});
