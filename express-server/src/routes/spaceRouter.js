import { Router } from 'express';
import LocationSocket from '../sockets/locationsSocket';
import SpaceController from '../controllers/spaceController';

class LocationRouter {
    constructor() {
        this.routes = Router();
    }

    start() {

        this.routes.get('/:location_id/spaces', [
            SpaceController.getAllSpaces,
            LocationSocket.broadcastEvent
        ]);

        this.routes.get('/:location_id/spaces/:space_id', [
            SpaceController.getSingleSpace,
            LocationSocket.broadcastEvent
        ]);

        this.routes.put('/:location_id/spaces/:space_id', [
            SpaceController.editSpace,
            LocationSocket.broadcastEvent
        ]);

        this.routes.post('/:location_id/spaces', [
            SpaceController.postSpace,
            LocationSocket.broadcastEvent
        ]);

        this.routes.delete('/:location_id', [
            SpaceController.deleteSpace,
            LocationSocket.broadcastEvent
        ]);

    }
}

export default LocationRouter;
