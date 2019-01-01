const isNumberId = (numericValue) => {
  if (Number.isNaN(numericValue)) {
    return false
  }
  return Number.isFinite(numericValue)
}

const isValidLocationId = (req, res, next) => {
  const locationId = Number.parseInt(req.params.locationId, 10)
  if (isNumberId(locationId)) {
    return res.status(400).send({
      message: 'LocationId should be a string'
    })
  }
  return next()
}

export default isValidLocationId
