"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pushid = _interopRequireDefault(require("pushid"));

var _errorHelper = _interopRequireDefault(require("../../helpers/errorHelper"));

var _numberHelper = _interopRequireDefault(require("../../helpers/numberHelper"));

var _createSubLocations = _interopRequireDefault(require("./subLocations/createSubLocations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const calculateTotalResidents = (numberOfFemales, numberOfMales) => {
  const totalResidents = _numberHelper.default.converToInteger(numberOfFemales) + _numberHelper.default.converToInteger(numberOfMales);

  return totalResidents;
};

const createLocation = async (db, newLocation) => {
  const {
    name,
    numberOfFemales,
    numberOfMales,
    subLocations
  } = newLocation;

  try {
    const locationId = (0, _pushid.default)();
    const locationName = name.trim();
    const totalResidents = calculateTotalResidents(numberOfFemales, numberOfMales);
    const [location, created] = await db.Location.findOrCreate({
      where: {
        name: locationName
      },
      defaults: {
        id: locationId,
        name: locationName,
        numberOfFemales,
        numberOfMales,
        totalResidents
      }
    });
    const createdLocation = location.dataValues;

    if (!created) {
      const error = _errorHelper.default.createError('409', `${name} already exists in the database`);

      throw error;
    }

    if (subLocations) {
      const createdSubLocations = await (0, _createSubLocations.default)(db, locationId, subLocations);
      createdLocation.subLocations = createdSubLocations;
    }

    return createdLocation;
  } catch (error) {
    const serverError = _errorHelper.default.getErrorStatusAndMessage(error);

    throw serverError;
  }
};

var _default = createLocation;
exports.default = _default;