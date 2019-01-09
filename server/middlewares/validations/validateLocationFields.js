import fields from '../../../constants/fields'
import ObjectHelper from '../../helpers/objectHelper'
import validateLocationField from './validateLocationField'

const { LOCATION_FIELDS } = fields

const validateLocationFields = (req, res, next) => {
  let errors = {}
  const locationDetails = req.body

  LOCATION_FIELDS.forEach((field) => {
    const fieldValue = locationDetails[field]
    errors[field] = validateLocationField(field, fieldValue)
  })

  if (locationDetails.subLocations) {
    const { subLocations } = locationDetails
    errors['subLocations'] = validateLocationField('subLocations', subLocations)
  }

  errors = ObjectHelper.removeBooleanKeysFromObject(errors)
  const isEmpty = ObjectHelper.isEmpty(errors)

  if (!isEmpty) {
    return res.status(400).send({
      errors
    })
  }

  return next()
}

export default validateLocationFields
