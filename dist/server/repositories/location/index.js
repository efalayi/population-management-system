"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createLocation = _interopRequireDefault(require("./createLocation"));

var _listLocations = _interopRequireDefault(require("./listLocations"));

var _getLocation = _interopRequireDefault(require("./getLocation"));

var _updateLocation = _interopRequireDefault(require("./updateLocation"));

var _deleteLocation = _interopRequireDefault(require("./deleteLocation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LocationRepository {
  static async createLocation(db, newLocation) {
    return (0, _createLocation.default)(db, newLocation);
  }

  static async listLocations(db, query) {
    return (0, _listLocations.default)(db, query);
  }

  static async getLocation(db, locationId) {
    return (0, _getLocation.default)(db, locationId);
  }

  static async updateLocation(db, locationId, locationUpdate) {
    return (0, _updateLocation.default)(db, locationId, locationUpdate);
  }

  static async deleteLocation(db, locationId) {
    return (0, _deleteLocation.default)(db, locationId);
  }

}

var _default = LocationRepository;
exports.default = _default;