const User = require('../../src/models/user');
const Zone = require('../../src/models/zone');

const clearZoneCollection = (done) => {
  Zone.deleteMany({}, (err) => {
    if (err) return done(err);
    done();
  });
}

const createZone = (done) => {
  const name = "Zone Test";
  const topX = { latitude: 0.013, longitude:  0.020 };
  const topY = { latitude: 0.013, longitude:  0.020 };
  const bottomX = { latitude: 0.013, longitude:  0.020 };
  const bottomY = { latitude: 0.013, longitude:  0.020 };
  Zone.create({ name, topX, topY, bottomX, bottomY }, (err) => {
    if (err) return done(err);
    done();
  });
}

module.exports = { createZone, clearZoneCollection }
