const isValidNumber = (field, fieldValue) => {
  const parsedValue = Number.parseInt(fieldValue, 10)
  const regex = /^[0-9]+$/
  if (Number.isNaN(parsedValue)) {
    return `${field} should be an integer`
  }
  if (regex.test(parsedValue)) {
    return true
  }
  return `${fieldValue} is not a positive integer`
}

export default isValidNumber
