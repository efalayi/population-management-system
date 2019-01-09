"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isValidLocationName = _interopRequireDefault(require("./isValidLocationName"));

var _objectHelper = _interopRequireDefault(require("../../helpers/objectHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isValidSubLocations = (field, value) => {
  const subLocations = value.split(',');
  const validationResult = subLocations.map(subLocation => {
    return (0, _isValidLocationName.default)(field, subLocation);
  });
  const errors = validationResult.filter(result => result !== true);

  const isEmpty = _objectHelper.default.isEmpty(errors);

  return isEmpty ? true : errors;
};

var _default = isValidSubLocations;
exports.default = _default;