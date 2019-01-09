"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _doesLocationExist = _interopRequireDefault(require("../validations/doesLocationExist"));

var _errorHelper = _interopRequireDefault(require("../../helpers/errorHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getLocationById = async (db, locationId, includeSubLocations) => {
  const locationIdError = await (0, _doesLocationExist.default)(db, locationId);

  if (locationIdError.length) {
    const error = _errorHelper.default.createError('404', locationIdError);

    throw error;
  }

  const location = await db.Location.findByPk(locationId, {
    include: includeSubLocations ? [{
      model: db.SubLocation,
      as: 'subLocations'
    }] : []
  });
  return location;
};

var _default = getLocationById;
exports.default = _default;