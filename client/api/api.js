import 'whatwg-fetch'
import locationHelper from '../helpers/locationHelper'

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

const deleteLocation = async (locationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations/${locationId}`, {
      method: 'DELETE',
      credentials: 'same-origin'
    })
    return response.json()
  } catch (error) {
    return error.json()
  }
}

const getLocation = async(locationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations/${locationId}`, {
      method: 'GET',
      credentials: 'same-origin'
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

const updateLocation = async (locationId, previousLocationData, locationUpdateData) => {
  const locationUpdate = locationHelper.buildLocationUpdateData(previousLocationData, locationUpdateData)
  try {
    const response = await fetch(`${API_BASE_URL}/locations/${locationId}`, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(locationUpdate)
    })
    return response.json()
  } catch (error) {
    return error.json()
  }
}

export default {
  createLocation,
  deleteLocation,
  getLocation,
  getLocations,
  updateLocation
}
