import React from 'react';
import { mount } from 'enzyme';

import { ParkingSpacesContext } from '../stores/ParkingSpacesProvider';
import ParkingLocationsWithSpacesView from './ParkingLocationsWithSpacesView';

/*
 *  location fields should render
 *
 *  capacity 
 *  - can cause divide by zero and should just say 'None'
 *  - check repeating decimal cases like 66%
 * 
 *  price
 *  - round to hundredths place and show the '$' symbol
 * 
 *  need to test the cartesian product summary:
 */

const mountComponent = ({ parkingLocation, parkingSpaces, viewAllLocations }) => mount(

        <ParkingSpacesContext.Provider value={{ parkingSpaces }}>
            <ParkingLocationsWithSpacesView 
                parkingLocation={parkingLocation} 
                viewAllLocations={viewAllLocations} 
            />
        </ParkingSpacesContext.Provider>
);

describe('Parking location fieds render and capacity shows none', () => {
    
    it('renders parking location fields', () => {

        // arrange
        const parkingLocation = {
            id: 1,
            name: 'Mighty Fine Parking',
            street: 'Some Lane',
            state: 'TX',
            zip: '88888',
            hours: 'M-F 24/7',
            price: 18.00,
        };
        const parkingSpaces = [ ];
        const viewAllLocations = jest.fn();

        const title = 'Parking Location';
        const formattedPrice = '$18.00';
        const capacity = 'None';

        // act
        const component = mountComponent({ parkingLocation, parkingSpaces, viewAllLocations });

        // assert
        expect(component.contains(title)).toEqual(true);
        expect(component.contains(parkingLocation.name)).toEqual(true);
        expect(component.contains(parkingLocation.street)).toEqual(true);
        expect(component.contains(parkingLocation.state)).toEqual(true);
        expect(component.contains(parkingLocation.zip)).toEqual(true);
        expect(component.contains(parkingLocation.hours)).toEqual(true);
        expect(component.contains(formattedPrice)).toEqual(true);
        expect(component.contains(capacity)).toEqual(true);

        expect(component.find('#credit_card').length).toEqual(0);
        component
            .find(`#viewAllLocations`)
            .simulate('click');

        expect(viewAllLocations).toHaveBeenCalled();;

        component.unmount();
    });

    it('renders parking location fields', () => {

        // arrange
        const title = 'Parking Location';
        const parkingLocation = {
            id: 1,
            name: 'Mighty Fine Parking',
            street: 'Some Lane',
            state: 'TX',
            zip: '88888',
            hours: 'M-F 24/7',
            price: 18.00,
        };
        const parkingSpaces = [
            {
                id: 2,
                available: true,
                creditCards: true,
                covered: true,
                handicap: true
            },
            {
                id: 3,
                available: true,
                creditCards: true,
                covered: false,
                handicap: true
            },
            {
                id: 4,
                available: false,
                creditCards: true,
                covered: false,
                handicap: false
            },
        ];

        const viewAllLocations = jest.fn();

        // act
        const component = mountComponent({ parkingLocation, parkingSpaces, viewAllLocations });

        // assert
        expect(component.contains(title)).toEqual(true);
        expect(component.contains(parkingLocation.name)).toEqual(true);
        expect(component.contains(parkingLocation.street)).toEqual(true);
        expect(component.contains(parkingLocation.state)).toEqual(true);
        expect(component.contains(parkingLocation.zip)).toEqual(true);
        expect(component.contains(parkingLocation.hours)).toEqual(true);
        expect(component.contains('$18.00')).toEqual(true);
        expect(component.contains('33%')).toEqual(true);

        expect(component.find('#credit_card').length).toEqual(2);
        component
            .find(`#viewAllLocations`)
            .simulate('click');

        expect(viewAllLocations).toHaveBeenCalled();;

        component.unmount();
    });
});
