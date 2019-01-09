"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const APP_DIRECTORY = _fs.default.realpathSync(process.cwd());

const resolvePath = relativePath => _path.default.resolve(APP_DIRECTORY, relativePath);

const APP_PATHS = {
  appBuild: resolvePath('dist'),
  appClient: resolvePath('client'),
  appHtml: resolvePath('client/index.html'),
  appServer: resolvePath('server'),
  appStatic: resolvePath('dist/static')
};
var _default = APP_PATHS;
exports.default = _default;