"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const getParentLocationBySubLocationId = async (db, subLocationId) => {
  let parentLocation = 'self';
  const subLocation = await db.SubLocation.findByPk(subLocationId);

  if (subLocation) {
    const {
      parentLocationId
    } = subLocation;
    parentLocation = db.Location.findByPk(parentLocationId);
  }

  return parentLocation;
};

var _default = getParentLocationBySubLocationId;
exports.default = _default;