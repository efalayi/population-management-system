"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _buildLocationUpdateData = _interopRequireDefault(require("../../adapters/buildLocationUpdateData"));

var _errorHelper = _interopRequireDefault(require("../../helpers/errorHelper"));

var _isValidLocationUpdate = _interopRequireDefault(require("../validations/isValidLocationUpdate"));

var _updateParentLocation = _interopRequireDefault(require("./updateParentLocation"));

var _createSubLocations = _interopRequireDefault(require("./subLocations/createSubLocations"));

var _getLocationById = _interopRequireDefault(require("./getLocationById"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const updateLocation = async (db, locationId, locationUpdate) => {
  try {
    const locationToUpdate = await (0, _getLocationById.default)(db, locationId);
    const locationUpdateError = await (0, _isValidLocationUpdate.default)(db, locationToUpdate, locationUpdate);

    if (locationUpdateError.length) {
      const error = _errorHelper.default.createError('400', locationUpdateError);

      throw error;
    }

    if (locationUpdate.subLocations) {
      await (0, _createSubLocations.default)(db, locationId, locationUpdate.subLocations);
    }

    const locationUpdateData = (0, _buildLocationUpdateData.default)(locationToUpdate, locationUpdate);
    const updatedLocation = await locationToUpdate.update(locationUpdateData);
    await (0, _updateParentLocation.default)(db, locationId);
    return updatedLocation;
  } catch (error) {
    const serverError = _errorHelper.default.getErrorStatusAndMessage(error);

    throw serverError;
  }
};

var _default = updateLocation;
exports.default = _default;