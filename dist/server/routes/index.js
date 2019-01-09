"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _location = _interopRequireDefault(require("./location"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const appRouter = new _express.Router();
appRouter.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Population Management System API'
  });
});
appRouter.use('/locations', _location.default);
var _default = appRouter;
exports.default = _default;