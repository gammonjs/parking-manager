import React, { useContext, useState } from 'react';

const withContainer = ({ModelContext, ListView, ItemView}) => () =>{
    const { locationsList } = useContext(ModelContext);
    const [ location_id, setLocation ] = useState();

    // bind state to context
    const location = location_id && locationsList.find(location =>
        Number(location_id) === Number(location.id));

    return (
        location
        ?   <ItemView
                parkingLocation={location}
                viewAllLocations={() => setLocation(null)}
            />
        :   <ListView
                parkingLocations={locationsList}
                viewLocation={(selected_location_id) => setLocation(selected_location_id)}
            />
    );
}

export default withContainer;
