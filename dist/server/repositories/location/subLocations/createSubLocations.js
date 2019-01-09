"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createSubLocation = _interopRequireDefault(require("./createSubLocation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createSubLocations = async (db, parentLocationId, subLocations) => {
  const locations = subLocations.split(',');
  const subLocationsPromises = locations.map(subLocation => (0, _createSubLocation.default)(db, parentLocationId, subLocation.trim()));
  const createdSubLocations = await Promise.all(subLocationsPromises);
  return createdSubLocations;
};

var _default = createSubLocations;
exports.default = _default;