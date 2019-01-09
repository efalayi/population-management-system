"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const getSubLocationDetails = async (db, subLocation) => {
  const formattedSubLocation = await db.Location.findByPk(subLocation.id);
  return formattedSubLocation.dataValues;
};

const formatLocation = async (db, location) => {
  const formattedLocation = location.dataValues;
  const subLocationsDetails = await Promise.all(formattedLocation.subLocations.map(subLocation => getSubLocationDetails(db, subLocation)));
  formattedLocation.subLocations = subLocationsDetails;
  return formattedLocation;
};

const formatLocationsList = async (db, locations) => {
  const locationsListPromises = locations.map(location => formatLocation(db, location));
  const formattedLocationsList = await Promise.all(locationsListPromises);
  return formattedLocationsList;
};

var _default = formatLocationsList;
exports.default = _default;