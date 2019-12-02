import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ParkingLocationCard from '../elements/ParkingLocationCard';

const ParkingLocationsView = ({ parkingLocations, viewLocation }) => {

    const View = styled.div`
        height: 100%;
        overflow-y: off;
    `;

    const Rolodex = styled.ul`
        list-style-type: none;
        padding-inline-start: 1em;
        padding-inline-end: 1em;
        overflow-y: auto;
        height: 100%
    `;

    const parkingLocationCards =
        parkingLocations &&
        parkingLocations.map(location =>
            <li
                id={`LocationId_${location.id}`}
                key={location.id}
                onClick={() => viewLocation(location.id)}
            >
                <ParkingLocationCard parkingLocation={location}/>
            </li>
        );

    return (
        <View>
            <h2>Parking Locations</h2>
            <Rolodex>
                {parkingLocationCards}
            </Rolodex>
        </View>
    );
}

ParkingLocationsView.propTypes = {
    viewLocation: PropTypes.func.isRequired
}

export default ParkingLocationsView;
