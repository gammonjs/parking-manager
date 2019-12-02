import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ParkingLocationCard from '../elements/ParkingLocationCard';
import ParkingSpacesTable from '../elements/ParkingSpacesTable';

const View = styled.div`
    height: 100%;
    overflow-y: auto;
`;

const ParkingLocationsWithSpacesView = ({ parkingLocation, viewAllLocations }) => {
    const parkingSpaces = parkingLocation.spaces;

    return (
        <View>
            <ParkingLocationCard parkingLocation={parkingLocation}/>
            <ParkingSpacesTable parkingSpaces={parkingSpaces} />

            <button id="viewAllLocations" onClick={() => viewAllLocations()}>
                Back
            </button>
        </View>
    );
}

ParkingLocationsWithSpacesView.propTypes = {
    parkingLocation: PropTypes.object.isRequired,
    viewAllLocations: PropTypes.func.isRequired
}

export default ParkingLocationsWithSpacesView;
