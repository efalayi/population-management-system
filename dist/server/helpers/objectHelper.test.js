"use strict";

var _chai = require("chai");

var _objectHelper = _interopRequireDefault(require("./objectHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-expressions */
describe('#ObjectHelper', () => {
  describe('#isEmpty', () => {
    it('should return a boolean value', () => {
      const isEmpty = _objectHelper.default.isEmpty({});

      (0, _chai.expect)(isEmpty).to.be.a('boolean');
      (0, _chai.expect)(isEmpty).to.equal(true);
    });
  });
  describe('#removeBooleanKeysFromObject', () => {
    it('should remove boolean key values from object', () => {
      const sampleObject = {
        booleanValue: true,
        stringValue: 'sample',
        numericValue: 10
      };

      const filteredObject = _objectHelper.default.removeBooleanKeysFromObject(sampleObject);

      (0, _chai.expect)(filteredObject).not.to.deep.equal(sampleObject);
      (0, _chai.expect)(filteredObject).not.to.have.property('booleanValue');
      (0, _chai.expect)(filteredObject).to.have.property('stringValue');
      (0, _chai.expect)(filteredObject).to.have.property('numericValue');
    });
  });
});