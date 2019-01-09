"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _errorHelper = _interopRequireDefault(require("../../helpers/errorHelper"));

var _getParentLocationBySubLocationId = _interopRequireDefault(require("./getParentLocationBySubLocationId"));

var _getLocationById = _interopRequireDefault(require("./getLocationById"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getLocation = async (db, locationId) => {
  try {
    const {
      dataValues: location
    } = await (0, _getLocationById.default)(db, locationId, true);
    const parentLocation = await (0, _getParentLocationBySubLocationId.default)(db, location.id);
    location.parentLocation = parentLocation;
    return location;
  } catch (error) {
    const serverError = _errorHelper.default.getErrorStatusAndMessage(error);

    throw serverError;
  }
};

var _default = getLocation;
exports.default = _default;