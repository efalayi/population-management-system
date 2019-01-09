"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = _interopRequireDefault(require("../../config/database"));

var _location = _interopRequireDefault(require("./location"));

var _subLocation = _interopRequireDefault(require("./subLocation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const env = process.env.NODE_ENV || 'development';
const config = _database.default[env];
let sequelize;

if (config.use_env_variable) {
  sequelize = new _sequelize.default(process.env[config.use_env_variable], config);
} else {
  sequelize = new _sequelize.default(config.database, config.username, config.password, config);
}

const models = {
  Location: _location.default.init(sequelize, _sequelize.default),
  SubLocation: _subLocation.default.init(sequelize, _sequelize.default)
};
Object.values(models).filter(model => typeof model.associate === 'function').forEach(model => model.associate(models));
const db = { ...models,
  sequelize
};
var _default = db;
exports.default = _default;