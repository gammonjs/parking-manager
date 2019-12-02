import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ParkingSpacesRow from './ParkingSpacesRow';

const Table = styled.ul`
    background: rgba(255,255,255,.10);
    margin-top: 16px;
    border-radius: 16px;
    padding: 16px;
    list-style-type: none;
    padding-inline-start: 1em;
    padding-inline-end: 1em;
    overflow-y: hide;
`;

const HeaderRow = styled.li`
    display: flex;
`;

const Header = styled.h3`
    margin: 0px;
    padding: 8px;
    width: 20%;
`;

const ParkingSpacesTable = ({parkingSpaces}) => {

    if (!parkingSpaces || parkingSpaces.length === 0) return null;

    return (
        <Table>
            <HeaderRow>
                <Header>Total</Header>
                <Header>Available</Header>
                <Header>Ammenities</Header>
            </HeaderRow>
            <ParkingSpacesRow 
                parkingSpaces={parkingSpaces} 
                properties={{creditCards: true, covered: true, handicap: true}}/>
            <ParkingSpacesRow 
                parkingSpaces={parkingSpaces} 
                properties={{creditCards: true, covered: true, handicap: false}}/>
            <ParkingSpacesRow 
                parkingSpaces={parkingSpaces} 
                properties={{creditCards: true, covered: false, handicap: true}}/>
            <ParkingSpacesRow 
                parkingSpaces={parkingSpaces} 
                properties={{creditCards: true, covered: false, handicap: false}}/>
            <ParkingSpacesRow 
                parkingSpaces={parkingSpaces} 
                properties={{creditCards: false, covered: true, handicap: true}}/>
            <ParkingSpacesRow 
                parkingSpaces={parkingSpaces} 
                properties={{creditCards: false, covered: true, handicap: false}}/>
            <ParkingSpacesRow 
                parkingSpaces={parkingSpaces} 
                properties={{creditCards: false, covered: false, handicap: true}}/>
            <ParkingSpacesRow 
                parkingSpaces={parkingSpaces} 
                properties={{creditCards: false, covered: false, handicap: false}}/>
        </Table>
    );
}

ParkingSpacesTable.propTypes = {
    parkingSpaces: PropTypes.array
}

export default ParkingSpacesTable;
