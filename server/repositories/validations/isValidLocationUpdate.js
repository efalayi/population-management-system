import getParentLocationBySubLocationId from '../location/getParentLocationBySubLocationId'
import getSubLocations from '../location/getSubLocations'

const isValidLocationUpdate = async (db, locationId) => {
  const parentLocation = await getParentLocationBySubLocationId(db, locationId)
  const subLocations = await getSubLocations(db, {
    parentLocationId: locationId
  })
  const subLocationsExist = subLocations.length > 0

  if (parentLocation === 'self' && subLocationsExist) {
    return 'Invalid location update'
  }
  return true
}

export default isValidLocationUpdate
