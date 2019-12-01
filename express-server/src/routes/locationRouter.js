import { Router } from 'express';
import LocationController from '../controllers/locationController.js';

const log = (req, res, next) => {
    console.log(res.statusCode);
    next();
}

class LocationRouter {
    constructor(socket) {
        this.socket = socket;
        this.routes = Router();
    }

    start() {
        this.routes.get('/', [
            LocationController.getAllLocations, 
            log
        ]);

        this.routes.get('/:location_id', [
            LocationController.getSingleLocation,
            log
        ]);

        this.routes.post('/', [
            LocationController.postLocation,
            log
        ]);

        this.routes.delete('/:location_id', [
            LocationController.deleteLocation,
            log
        ]);

        this.routes.put('/:location_id', [
            LocationController.editLocation,
            log
        ]);
    }
}

export default LocationRouter;
