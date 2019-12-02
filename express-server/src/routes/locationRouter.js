import { Router } from 'express';
import LocationController from '../controllers/locationController.js';
import LocationSocket from '../sockets/locationsSocket';



const log = (req, res, next) => {
    console.log(res.statusCode);
    next();
}

class LocationRouter {
    constructor() {
        this.routes = Router();
    }

    start() {
        this.routes.get('/', [
            LocationController.getAllLocations,
            log
        ]);

        // this.routes.get('/')

        this.routes.get('/:location_id/spaces', [
            LocationController.getSingleLocationSpaces,
            log
        ]);

        // this.routes.post('/:location_id/spaces', [
        //     LocationController.postSpace,
        //     LocationSocket.broadcastLocationChanged,
        //     log
        // ]);

        this.routes.post('/', [
            LocationController.postLocation,
            LocationSocket.broadcastEvent,
            log
        ]);

        this.routes.delete('/:location_id', [
            LocationController.deleteLocation,
            LocationSocket.broadcastEvent,
            log
        ]);

        this.routes.put('/:location_id', [
            LocationController.editLocation,
            LocationSocket.broadcastEvent,
            log
        ]);
    }
}

export default LocationRouter;
