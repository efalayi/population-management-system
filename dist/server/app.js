"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = _interopRequireDefault(require("./routes"));

var _paths = _interopRequireDefault(require("../config/paths"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const allowedOrigins = process.env.ALLOWED_ORIGINS;
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }

};
app.use((0, _cors.default)(corsOptions));
app.use('/static', _express.default.static(`${_paths.default.appBuild}/client/static`));
app.use('/api/v1', _routes.default);
app.get('*', (req, res) => {
  res.sendFile(`${_paths.default.appBuild}/client/index.html`);
});
var _default = app;
exports.default = _default;