const doesLocationExist = async (db, locationId) => {
  const location = await db.Location.findByPk(locationId)

  if (!location) {
    return `${locationId} does not exist`
  }
  return true
}

export default doesLocationExist
