import errorHelper from '../../helpers/errorHelper'
import getParentLocationBySubLocationId from './getParentLocationBySubLocationId'
import getLocationById from './getLocationById'

const getLocation = async (db, locationId) => {
  try {
    const { dataValues: location } = await getLocationById(db, locationId, true)

    const parentLocation = await getParentLocationBySubLocationId(db, location.id)
    location.parentLocation = parentLocation
    return location
  } catch (error) {
    const serverError = errorHelper.getErrorStatusAndMessage(error)
    throw (serverError)
  }
}

export default getLocation
