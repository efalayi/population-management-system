"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const isSubLocationValid = async (db, subLocationId) => {
  const subLocation = await db.SubLocation.findByPk(subLocationId);

  if (subLocation) {
    return `${subLocationId} has already been added as a subLocation to another location.`;
  }

  return true;
};

var _default = isSubLocationValid;
exports.default = _default;