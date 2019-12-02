import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CreditCard from '../icons/CreditCard';
import Covered from '../icons/Covered';
import Handicap from '../icons/Handicap';

const AMMENITY = {
    CREDIT_CARD: <CreditCard id="credit_card"/>,
    COVERED: <Covered id="covered"/>,
    HANDICAP: <Handicap id="handicap"/>
}

const TableRow = styled.li`
   display: flex;
`;

const AmmenityList = styled.ul`
    list-style-type: none;
    display: flex;
    align-items: center;
    padding: 0px;
`;

const AmmenityItem = styled.li`
    padding: 8px;
    
`;

const SpacesCount = styled.h3`
    margin: 0px;
    padding: 8px;
    width: 20%;
`;

const ParkingSpacesRow = ({parkingSpaces, properties}) => {
    const { creditCards, covered, handicap } = properties;

    const spacesWithProperties = parkingSpaces.filter(space =>
        space.creditCards === creditCards && 
        space.covered === covered && 
        space.handicap === handicap
    );

    if(spacesWithProperties.length === 0) 
        return null;

    const availableSpacesWithProperties = 
        spacesWithProperties.filter(space => space.available);
    
    return (
        <TableRow>
            <SpacesCount>{spacesWithProperties.length}</SpacesCount>
            <SpacesCount>{availableSpacesWithProperties.length}</SpacesCount>
            <AmmenityList>
                {creditCards && <AmmenityItem key='credit_card'>{AMMENITY.CREDIT_CARD}</AmmenityItem>}
                {covered && <AmmenityItem key='covered'>{AMMENITY.COVERED}</AmmenityItem>}
                {handicap && <AmmenityItem key='handicap'>{AMMENITY.HANDICAP}</AmmenityItem>}
            </AmmenityList>
        </TableRow>
    );
}

export default ParkingSpacesRow;
