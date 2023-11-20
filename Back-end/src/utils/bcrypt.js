const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync();

function hashPassword(password) {
  return bcrypt.hashSync(password, salt);
}

function comparePassword(password, dbPassword) {
  return bcrypt.compareSync(password, dbPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};
