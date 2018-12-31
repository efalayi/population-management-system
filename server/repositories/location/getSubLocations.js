import getLocationById from './getLocationById'

const buildSubLocationsData = async (db, subLocations) => {
  const locationPromises = subLocations.map(
    subLocation => getLocationById(db, subLocation.id, false)
  )
  const subLocationsData = await Promise.all(locationPromises)
  const subLocationsDataValues = subLocationsData.map(subLocation => subLocation.dataValues)
  return subLocationsDataValues
}

const getSubLocations = async (db, query) => {
  const subLocations = await db.SubLocation.findAll({
    where: query,
    raw: true
  })
  const subLocationsData = await buildSubLocationsData(db, subLocations)
  return subLocationsData
}

export default getSubLocations
