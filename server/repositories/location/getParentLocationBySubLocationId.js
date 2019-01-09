const getParentLocationBySubLocationId = async (db, subLocationId) => {
  let parentLocation = 'self'
  const subLocation = await db.SubLocation.findByPk(subLocationId)
  if (subLocation) {
    const { parentLocationId } = subLocation
    parentLocation = db.Location.findByPk(parentLocationId)
  }
  return parentLocation
}

export default getParentLocationBySubLocationId
