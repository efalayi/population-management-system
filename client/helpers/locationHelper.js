const buildLocationUpdateData = (previousLocationData, locationUpdateData) => {
  const locationUpdate = {}
  const LOCATION_DATA_KEYS = Object.keys(previousLocationData)
  LOCATION_DATA_KEYS.map((field) => {
    const updateValue = locationUpdateData[field]
    if (updateValue !== previousLocationData[field]) {
      locationUpdate[field] = updateValue
    }
  })
  return locationUpdate
}

const convertSubLocationsArrayToString = (location) => {
  const locationUpdateData = Object.assign({}, location)
  const subLocations = locationUpdateData.subLocations.map((subLocation) => {
    return subLocation.name || ''
  })
  locationUpdateData.subLocations = subLocations.join(',')
  return locationUpdateData
}

export default {
  buildLocationUpdateData,
  convertSubLocationsArrayToString
}