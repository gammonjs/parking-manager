import React from 'react';
import { mount } from 'enzyme';
import ParkingLocationsView from './ParkingLocationsView';

const mountComponent = ({ parkingLocations, viewLocation }) => mount(
    <ParkingLocationsView 
        parkingLocations={parkingLocations}
        viewLocation={viewLocation} />
);

describe('ParkingLocationsView', () => {

    it('renders with title when no locations exist', () => {

        // arrange
        const parkingLocations = null;
        const title = 'Parking Locations';
        const viewLocation = () => {};

        // act
        const component = mountComponent({ parkingLocations, viewLocation });

        // assert
        expect(component.contains(title)).toEqual(true);

        component.unmount();
    });

    it('renders parking location fields', () => {

        // arrange
        const title = 'Parking Locations';
        const location = {
            id: 1,
            name: 'Mighty Fine Parking',
            street: 'Some Lane',
            state: 'TX',
            zip: '88888',
            hours: 'M-F 24/7',
            price: 18.00,
        };
        const parkingLocations = [location];
        const viewLocation = jest.fn();

        // act
        const component = mountComponent({ parkingLocations,viewLocation });

        // assert
        expect(component.contains(title)).toEqual(true);

        expect(component.contains(location.name)).toEqual(true);
        expect(component.contains(location.street)).toEqual(true);
        expect(component.contains(location.state)).toEqual(true);
        expect(component.contains(location.zip)).toEqual(true);
        expect(component.contains(location.hours)).toEqual(true);
        expect(component.contains('$18.00')).toEqual(true);

        component
            .find(`#LocationId_${location.id}`)
            .simulate('click');

        expect(viewLocation).toHaveBeenCalledWith(location.id);;

        component.unmount();
    });
});
