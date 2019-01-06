import fields from '../../../constants/fields'
import isValidName from './isValidName'
import isValidNumber from './isValidNumber'
import ObjectHelper from '../../helpers/objectHelper'

const { LOCATION_FIELDS } = fields

const validations = (field, fieldValue) => ({
  name: isValidName(field, fieldValue),
  numberOfFemales: isValidNumber(field, fieldValue),
  numberOfMales: isValidNumber(field, fieldValue)
})

const isValidLocationField = (field, fieldValue) => {
  if (!fieldValue) {
    return 'Field is required'
  }
  return validations(field, fieldValue)[field]
}

const validateLocationFields = (req, res, next) => {
  const locationDetails = req.body
  let errors = {}

  LOCATION_FIELDS.forEach((field) => {
    const fieldValue = locationDetails[field]
    errors[field] = isValidLocationField(field, fieldValue)
  })

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
