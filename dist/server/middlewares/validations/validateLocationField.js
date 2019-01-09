"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isValidLocationName = _interopRequireDefault(require("./isValidLocationName"));

var _isValidNumber = _interopRequireDefault(require("./isValidNumber"));

var _isValidSubLocations = _interopRequireDefault(require("./isValidSubLocations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateLocationField = (field, value) => {
  if (!value) {
    return 'Field is required';
  }

  switch (field) {
    case 'name':
      return (0, _isValidLocationName.default)(field, value);

    case 'numberOfFemales':
    case 'numberOfMales':
      return (0, _isValidNumber.default)(field, value);

    case 'subLocations':
      return (0, _isValidSubLocations.default)(field, value);

    default:
      break;
  }
};

var _default = validateLocationField;
exports.default = _default;