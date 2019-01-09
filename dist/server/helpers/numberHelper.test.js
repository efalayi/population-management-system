"use strict";

var _chai = require("chai");

var _numberHelper = _interopRequireDefault(require("./numberHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-expressions */
describe('#numberHelper', () => {
  describe('#converToInteger', () => {
    it('should return a boolean value', () => {
      const intergerValue = _numberHelper.default.converToInteger('2');

      (0, _chai.expect)(intergerValue).to.be.a('number');
    });
  });
});