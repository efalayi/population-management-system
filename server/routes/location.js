import { Router } from 'express'
import LocationController from '../controllers/locationController'
import validateLocationFields from '../middlewares/validations/validateLocationFields'

const locationRouter = new Router()

locationRouter.get('/', LocationController.listLocations)
locationRouter.get('/:locationId', LocationController.getLocation)

locationRouter.post('/', validateLocationFields, LocationController.createLocation)

locationRouter.put('/:locationId', LocationController.updateLocation)
locationRouter.delete('/:locationId', LocationController.deleteLocation)

export default locationRouter
