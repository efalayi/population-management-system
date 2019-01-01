import { Router } from 'express'
import LocationController from '../controllers/locationController'
import validateLocationFields from '../middlewares/validations/validateLocationFields'
import isValidLocationId from '../middlewares/validations/isValidLocationId'

const locationRouter = new Router()

locationRouter.get('/', LocationController.listLocations)
locationRouter.get('/:locationId', isValidLocationId, LocationController.getLocation)

locationRouter.post('/', validateLocationFields, LocationController.createLocation)

locationRouter.put('/:locationId', isValidLocationId, LocationController.updateLocation)
locationRouter.delete('/:locationId', isValidLocationId, LocationController.deleteLocation)

export default locationRouter
