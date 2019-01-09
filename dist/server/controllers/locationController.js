"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _location = _interopRequireDefault(require("../repositories/location"));

var _models = _interopRequireDefault(require("../../database/models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const db = _models.default;

class LocationController {
  static async createLocation(req, res) {
    try {
      const createdLocation = await _location.default.createLocation(db, req.body);
      res.status(201).send({
        createdLocation,
        message: 'Location was successfully created'
      });
    } catch (error) {
      res.status(error.status).send({
        message: `${error.message}`
      });
    }
  }

  static async listLocations(req, res) {
    try {
      const {
        count,
        locations
      } = await _location.default.listLocations(db, req.query);
      res.status(200).send({
        count,
        locations
      });
    } catch (error) {
      res.status(error.status).send({
        message: `${error.message}`
      });
    }
  }

  static async getLocation(req, res) {
    const {
      locationId
    } = req.params;

    try {
      const location = await _location.default.getLocation(db, locationId);
      res.status(200).send({
        location
      });
    } catch (error) {
      res.status(error.status).send({
        message: `${error.message}`
      });
    }
  }

  static async updateLocation(req, res) {
    const {
      locationId
    } = req.params;
    const locationUpdate = req.body;

    try {
      const location = await _location.default.updateLocation(db, locationId, locationUpdate);
      res.status(200).send({
        location,
        message: 'Location has been successfully updated'
      });
    } catch (error) {
      res.status(error.status).send({
        message: `${error.message}`
      });
    }
  }

  static async deleteLocation(req, res) {
    const {
      locationId
    } = req.params;

    try {
      const location = await _location.default.deleteLocation(db, locationId);
      res.status(200).send({
        deletedLocation: location,
        message: 'Location has been successfully deleted'
      });
    } catch (error) {
      res.status(error.status).send({
        message: `${error.message}`
      });
    }
  }

}

var _default = LocationController;
exports.default = _default;