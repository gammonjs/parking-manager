
const reducer = (state, action) => {

    switch(action.type) {

        case EVENT.SERVER_RESPONSE__FETCHED_PARKING_LOCATIONS:
                console.log('B');
            return action.payload.map(location => mapPayloadToModel(location));

        case EVENT.SERVER_NOTIFICATION__PARKING_LOCATION_ADDED:
            console.log('adding location');
            const addedLocation = mapPayloadToModel(action.payload);
            return [...state, addedLocation];

        case EVENT.SERVER_NOTIFICATION__PARKING_LOCATION_CHANGED:
            const modifiedLocation = mapPayloadToModel(action.payload);
            return state.map(existingParkingLocation =>
                    Number(existingParkingLocation.id) !== Number(modifiedLocation.id)
                        ? existingParkingLocation : modifiedLocation);

        case EVENT.SERVER_NOTIFICATION__PARKING_LOCATION_DELETED:
            return state.filter(existingParkingLocation =>
                Number(existingParkingLocation.id) !== Number(action.payload));

        default:
            return state;
    }
}

export const EVENT = {
    CLIENT_REQUEST__JOIN_PARKING_LOCATIONS: 'CLIENT_REQUEST__JOIN_PARKING_LOCATIONS',
    CLIENT_REQUEST__FETCH_PARKING_LOCATIONS: 'CLIENT_REQUEST__FETCH_PARKING_LOCATIONS',
    CLIENT_REQUEST__LEAVE_PARKING_LOCATIONS: 'CLIENT_REQUEST__LEAVE_PARKING_LOCATIONS',

    SERVER_RESPONSE__JOINED_PARKING_LOCATIONS: 'SERVER_RESPONSE__JOINED_PARKING_LOCATIONS',
    SERVER_RESPONSE__FETCHED_PARKING_LOCATIONS: 'SERVER_RESPONSE__FETCHED_PARKING_LOCATIONS',

    SERVER_NOTIFICATION__PARKING_LOCATION_ADDED: 'SERVER_NOTIFICATION__PARKING_LOCATION_ADDED',
    SERVER_NOTIFICATION__PARKING_LOCATION_CHANGED: 'SERVER_NOTIFICATION__PARKING_LOCATION_CHANGED',
    SERVER_NOTIFICATION__PARKING_LOCATION_DELETED: 'SERVER_NOTIFICATION__PARKING_LOCATION_DELETED'
};

// helper methods below

const mapPayloadToModel = (payload) => withCapacity(withFormattedPrice(payload));

const withCapacity = (location) => {
    const spaces = location.spaces || [];
    const total = spaces.length;
    const available = spaces.filter(space => space.available).length;

    if(total === 0) {
        return {
            ...location,
            capacity: 'None'
        }
    }

    return {
        ...location,
        capacity: ((1 - available / total) * 100).toFixed(0)
    }
}

const withFormattedPrice = (location) =>  {
    return {
        ...location,
        price: location.price
                .toFixed(2)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
};

export default reducer;
