const { expect } = require('chai');

const Discussion = require('../../src/models/discussion');

describe('Discussion Model Test Suite', () => {
  it('Should throw errors if fields are missing', (done) => {
    const discussion = new Discussion();
    discussion.validate(function (err) {
      expect(err.errors.title).to.exist;
      done();
    });
  });
});