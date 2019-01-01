import getParentLocationBySubLocationId from './getParentLocationBySubLocationId'
import getSubLocations from './getSubLocations'

const getTotalNumberOfFemales = (subLocations) => {
  const initialValue = 0
  const totalNumberOfFemales = subLocations.reduce(
    (totalValue, currentValue) => totalValue + currentValue.numberOfFemales,
    initialValue
  )
  return totalNumberOfFemales
}

const getTotalNumberOfMales = (subLocations) => {
  const initialValue = 0
  const totalNumberOfMales = subLocations.reduce(
    (totalValue, currentValue) => totalValue + currentValue.numberOfMales,
    initialValue
  )
  return totalNumberOfMales
}

const updateParentLocation = async (db, locationId) => {
  const parentLocation = await getParentLocationBySubLocationId(db, locationId)
  if (parentLocation !== 'self') {
    const subLocations = await getSubLocations(db, {
      parentLocationId: parentLocation.id
    })
    const totalNumberOfFemales = getTotalNumberOfFemales(subLocations)
    const totalNumberOfMales = getTotalNumberOfMales(subLocations)
    const totalResidents = totalNumberOfFemales + totalNumberOfMales

    await parentLocation.update({
      numberOfFemales: totalNumberOfFemales,
      numberOfMales: totalNumberOfMales,
      totalResidents
    })
  }
}

export default updateParentLocation
