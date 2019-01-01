import errorHelper from '../../helpers/errorHelper'
import getLocationById from './getLocationById'

const deleteLocation = async (db, locationId) => {
  try {
    const location = await getLocationById(db, locationId)
    await location.destroy()
    return location
  } catch (error) {
    const serverError = errorHelper.getErrorStatusAndMessage(error)
    throw (serverError)
  }
}


export default deleteLocation
