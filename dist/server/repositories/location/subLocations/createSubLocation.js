"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pushid = _interopRequireDefault(require("pushid"));

var _errorHelper = _interopRequireDefault(require("../../../helpers/errorHelper"));

var _isSubLocationValid = _interopRequireDefault(require("../../validations/isSubLocationValid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createSubLocation = async (db, parentLocationId, subLocation) => {
  const [location] = await db.Location.findOrCreate({
    where: {
      name: subLocation
    },
    defaults: {
      id: (0, _pushid.default)(),
      name: subLocation
    }
  });
  const subLocationValidationError = await (0, _isSubLocationValid.default)(db, location.id);

  if (subLocationValidationError.length) {
    const error = _errorHelper.default.createError('409', `${subLocation} already exists as a subLocation`);

    throw error;
  }

  const createdSubLocation = await db.SubLocation.create({
    id: location.id,
    parentLocationId
  });
  return {
    id: createdSubLocation.dataValues.id,
    name: subLocation
  };
};

var _default = createSubLocation;
exports.default = _default;