import { Router } from 'express';
import LocationController from '../controllers/locationController.js';

const routes = Router();

routes.get('/locations', LocationController.getAllLocations);
routes.get('/locations/:location_id', LocationController.getSingleLocation);

export default routes;
