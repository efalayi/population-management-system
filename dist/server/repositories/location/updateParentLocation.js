"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getParentLocationBySubLocationId = _interopRequireDefault(require("./getParentLocationBySubLocationId"));

var _getSubLocations = _interopRequireDefault(require("./getSubLocations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getTotalNumberOfFemales = subLocations => {
  const initialValue = 0;
  const totalNumberOfFemales = subLocations.reduce((totalValue, currentValue) => totalValue + currentValue.numberOfFemales, initialValue);
  return totalNumberOfFemales;
};

const getTotalNumberOfMales = subLocations => {
  const initialValue = 0;
  const totalNumberOfMales = subLocations.reduce((totalValue, currentValue) => totalValue + currentValue.numberOfMales, initialValue);
  return totalNumberOfMales;
};

const updateParentLocation = async (db, locationId) => {
  const parentLocation = await (0, _getParentLocationBySubLocationId.default)(db, locationId);

  if (parentLocation !== 'self') {
    const subLocations = await (0, _getSubLocations.default)(db, {
      parentLocationId: parentLocation.id
    });
    const totalNumberOfFemales = getTotalNumberOfFemales(subLocations);
    const totalNumberOfMales = getTotalNumberOfMales(subLocations);
    const totalResidents = totalNumberOfFemales + totalNumberOfMales;
    await parentLocation.update({
      numberOfFemales: totalNumberOfFemales,
      numberOfMales: totalNumberOfMales,
      totalResidents
    });
  }
};

var _default = updateParentLocation;
exports.default = _default;