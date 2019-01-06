import 'whatwg-fetch'

const API_BASE_URL = `${process.env.API_URL}/api/v1`

const createLocation = async (location) => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(location)
    })
    return response.json()
  } catch (error) {
    return error.json()
  }
}

const getLocations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations`, {
      method: 'GET',
      credentials: 'same-origin'
    })
    return response.json()
  } catch (error) {
    return error.json()
  }
}

const getLocation = (locationId) => {
  return locationId
}

export default {
  createLocation,
  getLocation,
  getLocations
}
