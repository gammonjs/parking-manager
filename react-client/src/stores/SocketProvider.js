import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid'

const withSocket = ({SocketContext, socket}) => ({ children }) => {
    const [ client_id ] = useState(uuid());

    useEffect(() => {

        if(!socket) return;

        if (socket.disconnected) socket.open();

        return () => socket.close();

    }, []);

    return (
        <SocketContext.Provider value={{ socket, client_id }} >
            {children}
        </SocketContext.Provider>
    );
}

withSocket.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}

export default withSocket;
