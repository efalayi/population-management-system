"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getParentLocationBySubLocationId = _interopRequireDefault(require("../location/getParentLocationBySubLocationId"));

var _getSubLocations = _interopRequireDefault(require("../location/getSubLocations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isPopulationUpdate = locationUpdate => {
  if (locationUpdate.numberOfFemales || locationUpdate.numberOfMales) {
    return true;
  }

  return false;
};

const isValidLocationUpdate = async (db, locationToUpdate, locationUpdate) => {
  const locationId = locationToUpdate.id;
  const parentLocation = await (0, _getParentLocationBySubLocationId.default)(db, locationId);
  const subLocations = await (0, _getSubLocations.default)(db, {
    parentLocationId: locationId
  });
  const subLocationsExist = subLocations.length > 0;

  if (parentLocation === 'self' && subLocationsExist) {
    return isPopulationUpdate(locationUpdate) ? `${locationToUpdate.name} has sub-locations and cannot be updated directly.` : true;
  }

  if (parentLocation !== 'self') {
    return isPopulationUpdate(locationUpdate) ? true : `A subLocation cannot have a subLocation`;
  }

  return true;
};

var _default = isValidLocationUpdate;
exports.default = _default;