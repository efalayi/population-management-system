"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const doesLocationExist = async (db, locationId) => {
  const location = await db.Location.findByPk(locationId);

  if (!location) {
    return `${locationId} does not exist`;
  }

  return true;
};

var _default = doesLocationExist;
exports.default = _default;