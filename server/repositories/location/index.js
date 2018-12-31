import createLocation from './createLocation'
import listLocations from './listLocations'
import getLocation from './getLocation'
import updateLocation from './updateLocation'
import deleteLocation from './deleteLocation'

class LocationRepository {
  static async createLocation(db, newLocation) {
    return createLocation(db, newLocation)
  }

  static async listLocations(db, query) {
    return listLocations(db, query)
  }

  static async getLocation(db, locationId) {
    return getLocation(db, locationId)
  }

  static async updateLocation(db, locationId, locationUpdate) {
    return updateLocation(db, locationId, locationUpdate)
  }

  static async deleteLocation(db, locationId) {
    return deleteLocation(db, locationId)
  }
}

export default LocationRepository
