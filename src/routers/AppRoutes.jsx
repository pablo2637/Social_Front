import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../pages/auth';
import { HomePage } from '../pages';


export const AppRoutes = () => {

    return (

        <Routes>

            <Route
                path='/'
                element={<HomePage />}
            />

            <Route
                path='login'
                element={
                    <LoginPage />}
            />

            <Route
                path='register'
                element={
                    <RegisterPage />}
            />


            <Route path='/*' element={<Navigate to={'/'} />} />

        </Routes>

    )
}
