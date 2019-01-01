import pushId from 'pushid'
import errorHelper from '../../helpers/errorHelper'
import numberHelper from '../../helpers/numberHelper'
import createSubLocation from './createSubLocation'

const calculateTotalResidents = (numberOfFemales, numberOfMales) => {
  const totalResidents = numberHelper.converToInteger(
    numberOfFemales
  ) + numberHelper.converToInteger(numberOfMales)
  return totalResidents
}

const createSubLocations = async (db, parentLocationId, subLocations) => {
  const locations = subLocations.split(',')
  const subLocationsPromises = locations.map(
    subLocation => createSubLocation(db, parentLocationId, subLocation)
  )
  const createdSubLocations = await Promise.all(subLocationsPromises)
  return createdSubLocations
}

const createLocation = async (db, newLocation) => {
  const {
    name, numberOfFemales, numberOfMales, subLocations
  } = newLocation
  try {
    const locationId = pushId()
    const totalResidents = calculateTotalResidents(numberOfFemales, numberOfMales)
    const [location, created] = await db.Location.findOrCreate({
      where: {
        name
      },
      defaults: {
        id: locationId,
        name: name.trim(),
        numberOfFemales,
        numberOfMales,
        totalResidents
      }
    })
    const createdLocation = location.dataValues
    if (!created) {
      const error = errorHelper.createError('409', `${name} already exists in the database`)
      throw (error)
    }
    if (subLocations) {
      const createdSubLocations = await createSubLocations(db, locationId, subLocations)
      createdLocation.subLocations = createdSubLocations
    }
    return createdLocation
  } catch (error) {
    const serverError = errorHelper.getErrorStatusAndMessage(error)
    throw (serverError)
  }
}

export default createLocation