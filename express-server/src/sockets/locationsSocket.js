import Location from '../models/Location';
import Space from '../models/Space';

const EVENT = {
    CLIENT_REQUEST__JOIN_PARKING_LOCATIONS: 'CLIENT_REQUEST__JOIN_PARKING_LOCATIONS',
    CLIENT_REQUEST__FETCH_PARKING_LOCATIONS: 'CLIENT_REQUEST__FETCH_PARKING_LOCATIONS',
    CLIENT_REQUEST__LEAVE_PARKING_LOCATIONS: 'CLIENT_REQUEST__LEAVE_PARKING_LOCATIONS',

    SERVER_RESPONSE__JOINED_PARKING_LOCATIONS: 'SERVER_RESPONSE__JOINED_PARKING_LOCATIONS',
    SERVER_RESPONSE__FETCHED_PARKING_LOCATIONS: 'SERVER_RESPONSE__FETCHED_PARKING_LOCATIONS',
    SERVER_RESPONSE__LEFT_PARKING_LOCATIONS: 'SERVER_RESPONSE__LEFT_PARKING_LOCATIONS',

    SERVER_NOTIFICATION__PARKING_LOCATION_ADDED: 'SERVER_NOTIFICATION__PARKING_LOCATION_ADDED',
    SERVER_NOTIFICATION__PARKING_LOCATION_CHANGED: 'SERVER_NOTIFICATION__PARKING_LOCATION_CHANGED',
    SERVER_NOTIFICATION__PARKING_LOCATION_DELETED: 'SERVER_NOTIFICATION__PARKING_LOCATION_DELETED',
    SERVER_NOTIFICATION__PARKING_SPACE_CREATED: 'SERVER_NOTIFICATION__PARKING_SPACE_CREATED',
    SERVER_NOTIFICATION__PARKING_SPACE_CHANGED: 'SERVER_NOTIFICATION__PARKING_SPACE_CHANGED',
    SERVER_NOTIFICATION__PARKING_SPACE_DELETED: 'SERVER_NOTIFICATION__PARKING_SPACE_DELETED'
};

const clients = {};

const message = (client_id, event, data) => clients[client_id].emit(event, data);

class LocationSocket {

    static start(io) {

        io.on('connect', (socket) => {

            socket.on(EVENT.CLIENT_REQUEST__JOIN_PARKING_LOCATIONS, (client_id) => {
                clients[client_id] = socket;
                clients[client_id].join();
                clients[client_id].emit(EVENT.SERVER_RESPONSE__JOINED_PARKING_LOCATIONS);
            });

            socket.on(EVENT.CLIENT_REQUEST__LEAVE_PARKING_LOCATIONS, (client_id) => {
                if (!clients[client_id]) return;

                clients[client_id].emit(EVENT.SERVER_RESPONSE__LEFT_PARKING_LOCATIONS);
                clients[client_id].leave();
                delete clients[client_id];
            });

            socket.on(EVENT.CLIENT_REQUEST__FETCH_PARKING_LOCATIONS, (client_id) => {
                if (!clients[client_id]) return;

                Location.findAll({
                    include: [{ model: Space, as: "spaces" }]
                })
                    .then(results => message(client_id, EVENT.SERVER_RESPONSE__FETCHED_PARKING_LOCATIONS, results))
                    .catch(error => message(client_id, 'error', error));
            });
        });

        io.on('disconnect', () => {
            console.log('client connected');
        });
    }

    static broadcastEvent(req, res, next) {
        const socket = req.app.get('locations-socket');
        const id = req.params.location_id;

        switch (req.method) {
            case 'POST':
                if(res.statusCode === 201) {
                    Location.findOne({
                        where: { id },
                        include: [{ model: Space, as: "spaces" }]
                    })
                    .then(location => {
                        socket.emit(EVENT.SERVER_NOTIFICATION__PARKING_LOCATION_ADDED, location);
                    });
                }
                break;

            case 'PUT':
                if(res.statusCode === 200) {
                    Location.findOne({
                        where: { id },
                        include: [{ model: Space, as: "spaces" }]
                    })
                    .then(location => {
                        socket.emit(EVENT.SERVER_NOTIFICATION__PARKING_LOCATION_CHANGED, location);
                    });
                }
                break;

            case 'DELETE':
                if(res.statusCode === 204) {
                    socket.emit(EVENT.SERVER_NOTIFICATION__PARKING_LOCATION_DELETED, id);
                }
                break;
        }

        next();
    }

}

export default LocationSocket;
