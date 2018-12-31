import formatLocationsList from '../../adapters/formatLocationsList'

const listLocations = async (db, query) => {
  const { limit, offset } = query
  const fetchedLocations = await db.Location.findAll({
    include: [
      {
        model: db.SubLocation,
        as: 'subLocations'
      }
    ],
    limit: limit || 10,
    offset: offset || 0
  }, {
    plain: true
  })

  const locations = await formatLocationsList(db, fetchedLocations)

  return {
    count: fetchedLocations.length,
    locations
  }
}

export default listLocations
