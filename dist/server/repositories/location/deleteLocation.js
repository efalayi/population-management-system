"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _errorHelper = _interopRequireDefault(require("../../helpers/errorHelper"));

var _getLocationById = _interopRequireDefault(require("./getLocationById"));

var _getParentLocationBySubLocationId = _interopRequireDefault(require("./getParentLocationBySubLocationId"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const deleteLocation = async (db, locationId) => {
  try {
    const location = await (0, _getLocationById.default)(db, locationId);
    const parentLocation = await (0, _getParentLocationBySubLocationId.default)(db, locationId);
    await location.destroy();

    if (parentLocation !== 'self') {
      const parentLocationDetails = parentLocation.dataValues;
      const {
        totalResidents,
        numberOfFemales,
        numberOfMales
      } = parentLocationDetails;
      parentLocation.update({
        totalResidents: totalResidents - location.dataValues.totalResidents,
        numberOfFemales: numberOfFemales - location.dataValues.numberOfFemales,
        numberOfMales: numberOfMales - location.dataValues.numberOfMales
      });
    }

    return location;
  } catch (error) {
    const serverError = _errorHelper.default.getErrorStatusAndMessage(error);

    throw serverError;
  }
};

var _default = deleteLocation;
exports.default = _default;