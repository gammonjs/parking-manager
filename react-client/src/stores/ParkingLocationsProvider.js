import React, { useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import reducer, { EVENT } from './ParkingLocationsReducer';

const withContainer = ({SocketContext, ModelContext}) => ({ children }) => {
    const { socket, client_id } = useContext(SocketContext);
    const [locationsList, dispatch] = useReducer(reducer);

    useEffect(() => {
  
        if (!socket) return;

        socket.emit(EVENT.CLIENT_REQUEST__JOIN_PARKING_LOCATIONS, (client_id));

    }, [socket, client_id]);

    useEffect(() => {
        if (!socket) return;

        const joinedParkingLocations = [
            EVENT.SERVER_RESPONSE__JOINED_PARKING_LOCATIONS, () => {
                socket.emit(EVENT.CLIENT_REQUEST__FETCH_PARKING_LOCATIONS, client_id);
            }];

        const fetchedParkingLocations = [
            EVENT.SERVER_RESPONSE__FETCHED_PARKING_LOCATIONS, 
            (payload) => dispatch({ payload, type: EVENT.SERVER_RESPONSE__FETCHED_PARKING_LOCATIONS })
        ];

        const parkingLocationAdded = [
            EVENT.SERVER_NOTIFICATION__PARKING_LOCATION_ADDED, 
            (payload) => dispatch({ payload, type: EVENT.SERVER_NOTIFICATION__PARKING_LOCATION_ADDED })
        ];

        const parkingLocationModified = [
            EVENT.SERVER_NOTIFICATION__PARKING_LOCATION_CHANGED, 
            (payload) => dispatch({ payload, type: EVENT.SERVER_NOTIFICATION__PARKING_LOCATION_CHANGED })
        ];

        const parkingLocationDeleted = [
            EVENT.SERVER_NOTIFICATION__PARKING_LOCATION_DELETED, 
            (payload) => dispatch({ payload, type: EVENT.SERVER_NOTIFICATION__PARKING_LOCATION_DELETED })
        ];

        socket.on(...joinedParkingLocations);
        socket.on(...fetchedParkingLocations);
        socket.on(...parkingLocationAdded);
        socket.on(...parkingLocationModified);
        socket.on(...parkingLocationDeleted);

        return () => {
            socket.off(...joinedParkingLocations);
            socket.off(...fetchedParkingLocations);
            socket.off(...parkingLocationAdded);
            socket.off(...parkingLocationModified);
            socket.off(...parkingLocationDeleted);
        }

    }, [socket, client_id, locationsList]);

    return (
        <ModelContext.Provider value={{ locationsList }} >
            {children}
        </ModelContext.Provider>
    );
}

withContainer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default withContainer;

