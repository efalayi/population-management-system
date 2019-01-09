import getParentLocationBySubLocationId from '../location/getParentLocationBySubLocationId'
import getSubLocations from '../location/getSubLocations'

const isPopulationUpdate = (locationUpdate) => {
  if (locationUpdate.numberOfFemales || locationUpdate.numberOfMales) {
    return true
  }
  return false
}

const isValidLocationUpdate = async (db, locationToUpdate, locationUpdate) => {
  const locationId = locationToUpdate.id
  const parentLocation = await getParentLocationBySubLocationId(db, locationId)
  const subLocations = await getSubLocations(db, {
    parentLocationId: locationId
  })
  const subLocationsExist = subLocations.length > 0

  if (parentLocation === 'self' && subLocationsExist) {
    return isPopulationUpdate(locationUpdate) ? `${locationToUpdate.name} has sub-locations and cannot be updated directly.` : true
  }

  if (parentLocation !== 'self') {
    return isPopulationUpdate(locationUpdate) ? true : `A subLocation cannot have a subLocation`
  }

  return true
}

export default isValidLocationUpdate
