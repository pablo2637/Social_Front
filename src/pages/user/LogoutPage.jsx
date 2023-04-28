import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useEffect } from 'react';


export const LogoutPage = () => {

    const { logoutUser } = useAuthStore();

    const logout = () => logoutUser();

    useEffect(() => {
        logout();

    }, []);

    return (
        <Navigate to='/' />
    );
};
