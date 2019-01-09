"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectHelper = _interopRequireDefault(require("../../helpers/objectHelper"));

var _fields = _interopRequireDefault(require("../../../constants/fields"));

var _validateLocationField = _interopRequireDefault(require("./validateLocationField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  LOCATION_FIELDS
} = _fields.default;

const validateLocationUpdate = (req, res, next) => {
  const locationUpdate = req.body;

  const isUpdateEmpty = _objectHelper.default.isEmpty(locationUpdate);

  if (isUpdateEmpty) {
    return res.status(200).send({
      message: 'Nothing to update'
    });
  }

  let errors = {};
  const updateFields = Object.keys(locationUpdate);
  updateFields.forEach(field => {
    const fieldValue = locationUpdate[field];

    if (LOCATION_FIELDS.includes(field)) {
      errors[field] = (0, _validateLocationField.default)(field, fieldValue);
    }
  });

  if (locationUpdate.subLocations) {
    const {
      subLocations
    } = locationUpdate;
    errors['subLocations'] = (0, _validateLocationField.default)('subLocations', subLocations);
  }

  errors = _objectHelper.default.removeBooleanKeysFromObject(errors);

  const isEmpty = _objectHelper.default.isEmpty(errors);

  if (!isEmpty) {
    return res.status(400).send({
      errors,
      message: 'Location update failed'
    });
  }

  next();
};

var _default = validateLocationUpdate;
exports.default = _default;