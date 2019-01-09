"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getLocationById = _interopRequireDefault(require("./getLocationById"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildSubLocationsData = async (db, subLocations) => {
  const locationPromises = subLocations.map(subLocation => (0, _getLocationById.default)(db, subLocation.id, false));
  const subLocationsData = await Promise.all(locationPromises);
  const subLocationsDataValues = subLocationsData.map(subLocation => subLocation.dataValues);
  return subLocationsDataValues;
};

const getSubLocations = async (db, query) => {
  const subLocations = await db.SubLocation.findAll({
    where: query,
    raw: true
  });
  const subLocationsData = await buildSubLocationsData(db, subLocations);
  return subLocationsData;
};

var _default = getSubLocations;
exports.default = _default;