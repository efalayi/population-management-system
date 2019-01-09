import ObjectHelper from '../../helpers/objectHelper'
import fields from '../../../constants/fields'
import validateLocationField from './validateLocationField'

const { LOCATION_FIELDS } = fields

const validateLocationUpdate = (req, res, next) => {
  const locationUpdate = req.body
  const isUpdateEmpty = ObjectHelper.isEmpty(locationUpdate)

  if (isUpdateEmpty) {
    return res.status(200).send({
      message: 'Nothing to update'
    })
  }

  let errors = {}
  const updateFields = Object.keys(locationUpdate)

  updateFields.forEach((field) => {
    const fieldValue = locationUpdate[field]
    if (LOCATION_FIELDS.includes(field)) {
      errors[field] = validateLocationField(field, fieldValue)
    }
  })

  if (locationUpdate.subLocations) {
    const { subLocations } = locationUpdate
    errors['subLocations'] = validateLocationField('subLocations', subLocations)
  }

  errors = ObjectHelper.removeBooleanKeysFromObject(errors)
  const isEmpty = ObjectHelper.isEmpty(errors)
  
  if (!isEmpty) {
    return res.status(400).send({
      errors,
      message: 'Location update failed'
    })
  }
  next()
}

export default validateLocationUpdate
