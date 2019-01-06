import 'whatwg-fetch'

const API_BASE_URL = `${process.env.API_URL}/api/v1`

const getLocations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations`, {
      method: 'GET',
      credentials: 'same-origin'
    })
    return response.json()
  } catch (error) {
    return error.json(0)
  }
}

const getLocation = (locationId) => {
  return locationId
}

export default {
  getLocation,
  getLocations
}
