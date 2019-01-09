"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _formatLocationsList = _interopRequireDefault(require("../../adapters/formatLocationsList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const listLocations = async (db, query) => {
  const {
    limit,
    offset
  } = query;
  const fetchedLocations = await db.Location.findAll({
    include: [{
      model: db.SubLocation,
      as: 'subLocations'
    }],
    limit: limit || 10,
    offset: offset || 0
  }, {
    plain: true
  });
  const locations = await (0, _formatLocationsList.default)(db, fetchedLocations);
  return {
    count: fetchedLocations.length,
    locations
  };
};

var _default = listLocations;
exports.default = _default;