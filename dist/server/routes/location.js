"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _locationController = _interopRequireDefault(require("../controllers/locationController"));

var _validateLocationFields = _interopRequireDefault(require("../middlewares/validations/validateLocationFields"));

var _isValidLocationId = _interopRequireDefault(require("../middlewares/validations/isValidLocationId"));

var _validateLocationUpdate = _interopRequireDefault(require("../middlewares/validations/validateLocationUpdate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const locationRouter = new _express.Router();
locationRouter.get('/', _locationController.default.listLocations);
locationRouter.get('/:locationId', _isValidLocationId.default, _locationController.default.getLocation);
locationRouter.post('/', _validateLocationFields.default, _locationController.default.createLocation);
locationRouter.put('/:locationId', _isValidLocationId.default, _validateLocationUpdate.default, _locationController.default.updateLocation);
locationRouter.delete('/:locationId', _isValidLocationId.default, _locationController.default.deleteLocation);
var _default = locationRouter;
exports.default = _default;