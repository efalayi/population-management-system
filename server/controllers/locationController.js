import LocationRepository from '../repositories/location'
import Models from '../../database/models'

const db = Models

class LocationController {
  static async createLocation(req, res) {
    try {
      const createdLocation = await LocationRepository.createLocation(db, req.body)
      res.status(201).send({
        createdLocation,
        message: 'Location was successfully created'
      })
    } catch (error) {
      res.status(error.status).send({
        message: `${error.message}`
      })
    }
  }

  static async listLocations(req, res) {
    try {
      const { count, locations } = await LocationRepository.listLocations(db, req.query)
      res.status(200).send({
        count,
        locations,
      })
    } catch (error) {
      res.status(error.status).send({
        message: `${error.message}`
      })
    }
  }

  static async getLocation(req, res) {
    const { locationId } = req.params
    try {
      const location = await LocationRepository.getLocation(db, locationId)
      res.status(200).send({
        location
      })
    } catch (error) {
      res.status(error.status).send({
        message: `${error.message}`
      })
    }
  }

  static async updateLocation(req, res) {
    const { locationId } = req.params
    const locationUpdate = req.body
    try {
      const location = await LocationRepository.updateLocation(db, locationId, locationUpdate)
      res.status(200).send({
        location,
        message: 'Location has been successfully updated'
      })
    } catch (error) {
      res.status(error.status).send({
        message: `${error.message}`
      })
    }
  }

  static async deleteLocation(req, res) {
    const { locationId } = req.params
    try {
      const location = await LocationRepository.deleteLocation(db, locationId)
      res.status(200).send({
        deletedLocation: location,
        message: 'Location has been successfully deleted'
      })
    } catch (error) {
      res.status(error.status).send({
        message: `${error.message}`
      })
    }
  }
}

export default LocationController
