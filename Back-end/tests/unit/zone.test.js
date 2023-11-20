const { expect } = require('chai');

const Zone = require('../../src/models/zone');

describe('Zone Model Test Suite', () => {
  it('Should throw errors if fields are missing', (done) => {
    const zone = new Zone();
    zone.validate(function (err) {
      expect(err.errors.name).to.exist;
      // expect(err.errors).to.contain("topX");
      // expect(err.errors).to.contain("topY");
      // expect(err.errors).to.contain("bottomX");
      // expect(err.errors).to.contain("bottomY");
      done();
    });
  });
});