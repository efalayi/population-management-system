import pushId from 'pushid'
import errorHelper from '../../helpers/errorHelper'
import isSubLocationValid from '../validations/isSubLocationValid'

const createSubLocation = async (db, parentLocationId, subLocation) => {
  const [location] = await db.Location.findOrCreate({
    where: {
      name: subLocation
    },
    defaults: {
      id: pushId(),
      name: subLocation
    }
  })
  const subLocationValidationError = await isSubLocationValid(db, location.id)
  if (subLocationValidationError.length) {
    const error = errorHelper.createError('409', `${subLocation} already exists as a subLocation`)
    throw (error)
  }

  const createdSubLocation = await db.SubLocation.create({
    id: location.id,
    parentLocationId
  })

  return {
    id: createdSubLocation.dataValues.id,
    name: subLocation
  }
}

export default createSubLocation
