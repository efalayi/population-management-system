"use strict";

var _chai = require("chai");

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const server = (0, _supertest.default)(_app.default);
describe('GET /api/v1', () => {
  it('should return API welcome message', done => {
    server.get('/api/v1/').end((error, response) => {
      (0, _chai.expect)(response.body).to.have.property('message', 'Welcome to Population Management System API');
      done();
    });
  });
});