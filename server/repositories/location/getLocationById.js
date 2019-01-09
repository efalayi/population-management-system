import doesLocationExist from '../validations/doesLocationExist'
import errorHelper from '../../helpers/errorHelper'

const getLocationById = async (db, locationId, includeSubLocations) => {
  const locationIdError = await doesLocationExist(db, locationId)

  if (locationIdError.length) {
    const error = errorHelper.createError('404', locationIdError)
    throw (error)
  }

  const location = await db.Location.findByPk(locationId, {
    include: includeSubLocations ? [
      {
        model: db.SubLocation,
        as: 'subLocations'
      }
    ] : []
  })

  return location
}

export default getLocationById
