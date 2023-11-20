const { expect } = require('chai');

const bcrypt = require('../../src/utils/bcrypt');

describe("Bcrypt Utils Functions", () => {
  describe("Hash password", () => {
    it("should return a hashed password", () => {
      const password = "bonjour";
      expect(bcrypt.hashPassword(password)).to.be.a("string");
      expect(bcrypt.hashPassword(password)).to.match(/$/);
    });
  });

  describe("Compare user input and hashed password", () => {
    it("should return a boolean", () => {
      const password = "bonjour";
      const hashed = "$2b$10$CERxrXsqgfuyp/VdFseCs.d3LO7PfZmmEKXfefvLpZZugcYRDwth.";
      expect(bcrypt.comparePassword(password, hashed)).to.be.a("boolean");
      expect(bcrypt.comparePassword(password, hashed)).to.be.oneOf([false, true]);
    });
  });
});