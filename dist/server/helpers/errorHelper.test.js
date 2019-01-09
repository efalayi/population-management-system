"use strict";

var _chai = require("chai");

var _errorHelper = _interopRequireDefault(require("./errorHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('#ErrorHelper', () => {
  describe('#createError', () => {
    it('should create an Error with defined status string and message', () => {
      const customError = _errorHelper.default.createError('400', 'Custom message');

      (0, _chai.expect)(customError.code).to.equal('400');
    });
  });
  describe('#createServerError', () => {
    it('should create an error object with status 500', () => {
      const serverError = _errorHelper.default.createServerError();

      (0, _chai.expect)(typeof serverError).to.equal('object');
      (0, _chai.expect)(serverError.status).to.equal('500');
      (0, _chai.expect)(serverError).not.to.have.property('code');
      (0, _chai.expect)(serverError).to.have.property('message');
    });
    describe('internalServerError', () => {
      it('should be included as a property errors property exists in passed error object', () => {
        const withDbError = {
          errors: ['Some random database error']
        };

        const serverError = _errorHelper.default.createServerError(withDbError);

        (0, _chai.expect)(typeof serverError).to.equal('object');
        (0, _chai.expect)(serverError.status).to.equal('500');
        (0, _chai.expect)(serverError).not.to.have.property('code');
        (0, _chai.expect)(serverError).to.have.property('message');
        (0, _chai.expect)(serverError).to.have.property('internalServerError');
      });
      it('should be included as a property message property exists in passed error object', () => {
        const error = {
          message: 'Some random server error'
        };

        const serverError = _errorHelper.default.createServerError(error);

        (0, _chai.expect)(typeof serverError).to.equal('object');
        (0, _chai.expect)(serverError.status).to.equal('500');
        (0, _chai.expect)(serverError).not.to.have.property('code');
        (0, _chai.expect)(serverError).to.have.property('message');
        (0, _chai.expect)(serverError).to.have.property('internalServerError', error.message);
      });
      it('should be included as a property message property exists in passed error object', () => {
        const errorString = 'Some random server error';

        const serverError = _errorHelper.default.createServerError(errorString);

        (0, _chai.expect)(typeof serverError).to.equal('object');
        (0, _chai.expect)(serverError.status).to.equal('500');
        (0, _chai.expect)(serverError).not.to.have.property('code');
        (0, _chai.expect)(serverError).to.have.property('message');
        (0, _chai.expect)(serverError).to.have.property('internalServerError', errorString);
      });
    });
  });
  describe('#getErrorStatusAndMessage', () => {
    it('should return status and message of parsed Error object', () => {
      const customError = _errorHelper.default.createError('409', 'Custom error message');

      const error = _errorHelper.default.getErrorStatusAndMessage(customError);

      (0, _chai.expect)(error).to.have.property('status', 409);
      (0, _chai.expect)(error).to.have.property('message', 'Custom error message');
    });
    it('should return status as 500 if error object has no status', () => {
      const customError = {
        message: 'Error with no status'
      };

      const error = _errorHelper.default.getErrorStatusAndMessage(customError);

      (0, _chai.expect)(error).to.have.property('status', 500);
      (0, _chai.expect)(error).to.have.property('message', customError.message);
    });
  });
});