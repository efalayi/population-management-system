const isSubLocationValid = async (db, subLocationId) => {
  const subLocation = await db.SubLocation.findByPk(subLocationId)
  if (subLocation) {
    return `${subLocationId} has already been added as a subLocation to another location.`
  }
  return true
}

export default isSubLocationValid
