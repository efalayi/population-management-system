import buildLocationUpdateData from '../../adapters/buildLocationUpdateData'
import errorHelper from '../../helpers/errorHelper'
import isValidLocationUpdate from '../validations/isValidLocationUpdate'
import updateParentLocation from './updateParentLocation'
import createSubLocations from './subLocations/createSubLocations'
import getLocationById from './getLocationById'

const updateLocation = async (db, locationId, locationUpdate) => {
  try {
    const locationToUpdate = await getLocationById(db, locationId)
    const locationUpdateError = await isValidLocationUpdate(db, locationToUpdate.id)

    if (locationUpdateError.length) {
      const error = errorHelper.createError('400', `${locationToUpdate.name} has sub-locations and cannot be updated directly.`)
      throw (error)
    }

    if (locationUpdate.subLocations) {
      await createSubLocations(db, locationId, locationUpdate.subLocations)
    }

    const locationUpdateData = buildLocationUpdateData(locationToUpdate, locationUpdate)
    const updatedLocation = await locationToUpdate.update(locationUpdateData)
    await updateParentLocation(db, locationId)
    return updatedLocation
  } catch (error) {
    const serverError = errorHelper.getErrorStatusAndMessage(error)
    throw (serverError)
  }
}

export default updateLocation
