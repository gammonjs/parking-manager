import { Router } from 'express';
import LocationController from '../controllers/locationController.js';
import LocationSocket from '../sockets/locationsSocket';

class LocationRouter {
    constructor() {
        this.routes = Router();
    }

    start() {
        this.routes.get('/', [
            LocationController.getAllLocations
        ]);

        this.routes.get('/:location_id', [
            LocationController.getSingleLocation
        ]);

        this.routes.put('/:location_id', [
            LocationController.editLocation,
            LocationSocket.broadcastLocationChangeEvent
        ]);

        this.routes.post('/', [
            LocationController.postLocation,
            LocationSocket.broadcastLocationAddedEvent
        ]);

        this.routes.delete('/:location_id', [
            LocationController.deleteLocation,
            LocationSocket.broadcastLocationDeletedEvent
        ]);
    }
}

export default LocationRouter;
