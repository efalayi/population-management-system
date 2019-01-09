import isValidLocationName from './isValidLocationName'
import ObjectHelper from '../../helpers/objectHelper'

const isValidSubLocations = (field, value) => {
  const subLocations = value.split(',')
  const validationResult = subLocations.map((subLocation) => {
    return isValidLocationName(field, subLocation)
  })
  const errors = validationResult.filter((result) => result !== true)
  const isEmpty = ObjectHelper.isEmpty(errors)
  return isEmpty ? true : errors
}

export default isValidSubLocations
