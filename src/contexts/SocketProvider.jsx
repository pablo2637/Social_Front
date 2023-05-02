import { useState } from 'react';
import { SocketContext } from './SocketContext';

export const SocketProvider = ({ children }) => {

    const [socket, setSocket] = useState(null)

    return (
        <SocketContext.Provider value={{ socket, setSocket }} >
            {children}
        </SocketContext.Provider >
    )
}
