import React, { createContext } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';

import SocketProviderWithContainer from './stores/SocketProvider';
import ControllerWithContainer from './components/controllers/ParkingLocationController';
import ModelProviderWithContainer from './stores/ParkingLocationsProvider';
import ListView from './components/views/ParkingLocationsView';
import ItemView from './components/views/ParkingLocationsWithSpacesView';


const App = () => {

    const ModelContext = createContext();
    const SocketContext = createContext();
    const socket = io.connect('http://localhost:80');

    // HOC pattern used for isolation testing
    const SocketProvider = SocketProviderWithContainer({ SocketContext, socket });
    const ModelProvider = ModelProviderWithContainer({ SocketContext, ModelContext });
    const ModelViewController = ControllerWithContainer({ ModelContext, ListView, ItemView });

    return (
        <SocketProvider>
            <ModelProvider>
                <Page>
                    <Header>
                        <div>Header</div>
                    </Header>
                    <Body>
                        <ModelViewController />
                    </Body>
                    <Footer>
                        Footer
                    </Footer>
                </Page>
            </ModelProvider>
        </SocketProvider>
    );
}

const Page = styled.div`
    margin: 0px;
    padding: 0px;
    width: 100%;
    min-width: 600px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #121212;
    color: rgba(255,255,255,.75);
    overflow: hidden;
`;

const Header = styled.div`
    height: 82px;
    width: 100%;
    position: fixed;
    background: rgba(255,255,255,.25);
    color: rgba(255,255,255,.75);
`;

const Body = styled.div`
    height: 90%;
    width: 90%;
    padding: 82px 41px 200px 41px;
`;

const Footer = styled.div`
    height: 82px;
    position: fixed;
    bottom: 0;
    width: 100%;
    background: darkgrey;
    background: rgba(255,255,255,.25);
    color: rgba(255,255,255,.75);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export default App;
