"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _numberHelper = _interopRequireDefault(require("../helpers/numberHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildLocationUpdateData = (locationToUpdate, locationUpdate) => {
  const {
    dataValues: existingLocationData
  } = locationToUpdate;
  const {
    name,
    numberOfFemales,
    numberOfMales
  } = locationUpdate;
  const locationUpdateData = { ...existingLocationData
  };
  let totalResidents = 0;

  if (name) {
    locationUpdateData.name = name;
  }

  if (numberOfFemales) {
    const femaleCount = _numberHelper.default.converToInteger(numberOfFemales);

    locationUpdateData.numberOfFemales = femaleCount;
    totalResidents = femaleCount + locationUpdateData.numberOfMales;
  }

  if (numberOfMales) {
    const maleCount = _numberHelper.default.converToInteger(numberOfMales);

    locationUpdateData.numberOfMales = maleCount;
    totalResidents = maleCount + locationUpdateData.numberOfFemales;
  }

  if (totalResidents > 0) {
    locationUpdateData.totalResidents = totalResidents;
  }

  return locationUpdateData;
};

var _default = buildLocationUpdateData;
exports.default = _default;