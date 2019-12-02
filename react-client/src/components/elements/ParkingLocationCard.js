import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ParkingLocationCard = ({ parkingLocation }) => {

    return (
        <Card>
            <Name>{parkingLocation.name}</Name>
            <InformationBox>
                <About>
                    <Address>
                        <Street>{parkingLocation.street}</Street>
                        <StateZip>{parkingLocation.state + ', ' + parkingLocation.zip}</StateZip>
                    </Address>
                    <div>{'Hours: ' + parkingLocation.hours}</div>
                </About>
                <Callouts>
                    <Price>{'Price $' + parkingLocation.price}</Price>
                    <Capacity>{parkingLocation.capacity + '% Full'}</Capacity>
                </Callouts>
            </InformationBox>
        </Card>
    );
}

ParkingLocationCard.propTypes = {
    parkingLocation: PropTypes.object.isRequired
}

const Card = styled.div`
   background: rgba(255,255,255,.10);
   margin-top: 8px;
   border-radius: 16px;
   padding: 16px;
`;

const Name = styled.h3`
   background-image: linear-gradient(to right, rgba(20,80,100, .75), rgba(255,255,255, .75));
   border-radius: 8px;
   color: rgba(255,255,255,.75);
   padding: 8px;
`;

const InformationBox = styled.div`
   display: flex;
   justify-content: space-between;
`;

const About = styled.div`
   width: 80%;
   display: flex;
   flex-direction: column;
`;

const Address = styled.div`
   display: flex;
   flex-direction: column;
   margin-bottom: 1rem;
`;

const Street = styled.div`
   font-style: bold;
`;

const StateZip = styled.div`
   font-style: italic;
   color: rgba(255,255,255,.55);
`;

const Callouts = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
`;

const Price = styled.div`
   background: rgba(20,100,80, .75);
   color: rgba(255,255,255, .75);
   padding: 8px;
   margin-bottom: 1rem;
   font-style: bold;
   border-radius: 8px;
   text-align: center;
`;

const Capacity = styled.div`
   background: rgba(80,20,140, .75);
   color: rgba(255,255,255, .75);
   padding: 8px;
   font-style: bold;
   border-radius: 8px;
   text-align: center;
`;

export default ParkingLocationCard;
