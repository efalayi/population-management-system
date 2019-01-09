"use strict";

var _chalk = _interopRequireDefault(require("chalk"));

var _app = _interopRequireDefault(require("./app"));

var _envVariables = _interopRequireDefault(require("../config/envVariables"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
const {
  environment,
  port
} = _envVariables.default;

const printStartMessage = () => {
  let modeColorPrint = 'yellow';

  if (environment === 'production') {
    modeColorPrint = 'green';
  }

  console.log(_chalk.default[modeColorPrint](`Started PMS API in ${environment} mode`));
  console.log(_chalk.default.green(`PMS API is running on port: ${port}`));
};

_app.default.listen(port, error => {
  if (error) {
    console.log(_chalk.default.red(error));
  } else {
    printStartMessage();
  }
});