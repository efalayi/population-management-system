import isValidLocationName from './isValidLocationName'
import isValidNumber from './isValidNumber'
import isValidSubLocations from './isValidSubLocations'

const validateLocationField = (field, value) => {
  if (!value) {
    return 'Field is required'
  }
  switch (field) {
    case 'name':
      return isValidLocationName(field, value)
    case 'numberOfFemales':
    case 'numberOfMales':
      return isValidNumber(field, value)
    case 'subLocations':
      return isValidSubLocations(field, value)
    default:
      break
  }
}

export default validateLocationField