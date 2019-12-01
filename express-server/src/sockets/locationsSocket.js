import Location from '../models/Location';
import Space from '../models/Space';

const EVENT = {
    CLIENT_REQUEST__JOIN_PARKING_LOCATIONS: 'CLIENT_REQUEST__JOIN_PARKING_LOCATIONS',
    CLIENT_REQUEST__FETCH_PARKING_LOCATIONS: 'CLIENT_REQUEST__FETCH_PARKING_LOCATIONS',
    CLIENT_REQUEST__LEAVE_PARKING_LOCATIONS: 'CLIENT_REQUEST__LEAVE_PARKING_LOCATIONS',

    SERVER_RESPONSE__JOINED_PARKING_LOCATIONS: 'SERVER_RESPONSE__JOINED_PARKING_LOCATIONS',
    SERVER_RESPONSE__FETCHED_PARKING_LOCATIONS: 'SERVER_RESPONSE__FETCHED_PARKING_LOCATIONS',
    SERVER_RESPONSE__LEFT_PARKING_LOCATIONS: 'SERVER_RESPONSE__LEFT_PARKING_LOCATIONS',
};

const clients = {};

const message = (client_id, event, data) => clients[client_id].emit(event, data);

class LocationSocket {
    constructor(io) {
        this.socket = io;
    }

    start() {

        this.socket.on('connect', () => {

            console.log('client connected');

            this.socket.on(EVENT.CLIENT_REQUEST__JOIN_PARKING_LOCATIONS, (client_id) => {
                clients[client_id] = this.socket;
                clients[client_id].join();
                clients[client_id].emit(EVENT.SERVER_RESPONSE__JOINED_PARKING_LOCATIONS);
            });

            this.socket.on(EVENT.CLIENT_REQUEST__LEAVE_PARKING_LOCATIONS, (client_id) => {
                if (!clients[client_id]) return;

                clients[client_id].emit(EVENT.SERVER_RESPONSE__LEFT_PARKING_LOCATIONS);
                clients[client_id].leave();
                delete clients[client_id];
            });

            this.socket.on(EVENT.CLIENT_REQUEST__FETCH_PARKING_LOCATIONS, (client_id) => {
                if (!clients[client_id]) return;

                Location.findAll({
                    include: [{ model: Space, as: "spaces" }]
                })
                    .then(results => message(client_id, EVENT.SERVER_RESPONSE__FETCHED_PARKING_LOCATIONS, results))
                    .catch(error => message(client_id, 'error', error));
            });
        });

        this.socket.on('disconnect', () => {
            console.log('client connected');
        });
    }       
}

export default LocationSocket;
