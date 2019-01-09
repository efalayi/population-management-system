"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const envVariables = {
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbUserName: process.env.DB_USERNAME,
  environment: process.env.NODE_ENV,
  port: process.env.PORT
};
var _default = envVariables;
exports.default = _default;