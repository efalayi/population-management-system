import createSubLocation from './createSubLocation'

const createSubLocations = async (db, parentLocationId, subLocations) => {
  const locations = subLocations.split(',')
  const subLocationsPromises = locations.map(
    subLocation => createSubLocation(db, parentLocationId, subLocation)
  )
  const createdSubLocations = await Promise.all(subLocationsPromises)
  return createdSubLocations
}

export default createSubLocations
