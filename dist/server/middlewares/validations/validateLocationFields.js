"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fields = _interopRequireDefault(require("../../../constants/fields"));

var _objectHelper = _interopRequireDefault(require("../../helpers/objectHelper"));

var _validateLocationField = _interopRequireDefault(require("./validateLocationField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  LOCATION_FIELDS
} = _fields.default;

const validateLocationFields = (req, res, next) => {
  let errors = {};
  const locationDetails = req.body;
  LOCATION_FIELDS.forEach(field => {
    const fieldValue = locationDetails[field];
    errors[field] = (0, _validateLocationField.default)(field, fieldValue);
  });

  if (locationDetails.subLocations) {
    const {
      subLocations
    } = locationDetails;
    errors['subLocations'] = (0, _validateLocationField.default)('subLocations', subLocations);
  }

  errors = _objectHelper.default.removeBooleanKeysFromObject(errors);

  const isEmpty = _objectHelper.default.isEmpty(errors);

  if (!isEmpty) {
    return res.status(400).send({
      errors
    });
  }

  return next();
};

var _default = validateLocationFields;
exports.default = _default;