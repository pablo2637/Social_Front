import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useContext, useEffect } from 'react';
import { SocketContext } from '../../contexts/SocketContext';

export const LogoutPage = () => {

    const { logoutUser } = useAuthStore();

    const { socket } = useContext(SocketContext);

    const logout = async () => {
        await logoutUser();
        socket.emit('byeBye');
    }

    useEffect(() => {
        logout();

    }, []);

    return (
        <Navigate to='/' />
    );
};
