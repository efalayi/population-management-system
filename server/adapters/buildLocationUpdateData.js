import numberHelper from '../helpers/numberHelper'

const buildLocationUpdateData = (locationToUpdate, locationUpdate) => {
  const { dataValues: existingLocationData } = locationToUpdate
  const { name, numberOfFemales, numberOfMales } = locationUpdate
  const locationUpdateData = { ...existingLocationData }
  let totalResidents = 0

  if (name) {
    locationUpdateData.name = name
  }
  if (numberOfFemales) {
    const femaleCount = numberHelper.converToInteger(numberOfFemales)
    locationUpdateData.numberOfFemales = femaleCount
    totalResidents = femaleCount + locationUpdateData.numberOfMales
  }
  if (numberOfMales) {
    const maleCount = numberHelper.converToInteger(numberOfMales)
    locationUpdateData.numberOfMales = maleCount
    totalResidents = maleCount + locationUpdateData.numberOfFemales
  }
  if (totalResidents > 0) {
    locationUpdateData.totalResidents = totalResidents
  }
  return locationUpdateData
}

export default buildLocationUpdateData
