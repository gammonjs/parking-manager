import { Router } from 'express';
import LocationSocket from '../sockets/locationsSocket';
import SpaceController from '../controllers/spaceController';

class LocationRouter {
    constructor() {
        this.routes = Router();
    }

    start() {

        this.routes.get('/:location_id/spaces', [
            SpaceController.getAllSpaces
        ]);

        this.routes.get('/:location_id/spaces/:space_id', [
            SpaceController.getSingleSpace
        ]);

        this.routes.put('/:location_id/spaces/:space_id', [
            SpaceController.editSpace,
            LocationSocket.broadcastLocationChangeEvent
        ]);

        this.routes.post('/:location_id/spaces', [
            SpaceController.postSpace,
            LocationSocket.broadcastLocationChangeEvent
        ]);

        this.routes.delete('/:location_id', [
            SpaceController.deleteSpace,
            LocationSocket.broadcastLocationChangeEvent
        ]);

    }
}

export default LocationRouter;
