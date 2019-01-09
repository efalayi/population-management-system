import errorHelper from '../../helpers/errorHelper'
import getLocationById from './getLocationById'
import getParentLocationBySubLocationId from './getParentLocationBySubLocationId'

const deleteLocation = async (db, locationId) => {
  try {
    const location = await getLocationById(db, locationId)
    const parentLocation = await getParentLocationBySubLocationId(db, locationId)

    await location.destroy()

    if (parentLocation !== 'self') {
      const parentLocationDetails = parentLocation.dataValues
      const { totalResidents, numberOfFemales, numberOfMales } = parentLocationDetails
      parentLocation.update({
        totalResidents: totalResidents - location.dataValues.totalResidents,
        numberOfFemales: numberOfFemales - location.dataValues.numberOfFemales,
        numberOfMales: numberOfMales - location.dataValues.numberOfMales
      })
    }

    return location
  } catch (error) {
    const serverError = errorHelper.getErrorStatusAndMessage(error)
    throw (serverError)
  }
}


export default deleteLocation
