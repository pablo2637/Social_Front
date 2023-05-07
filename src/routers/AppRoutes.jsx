import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../pages/auth';
import { HomePage, PublicProfiles } from '../pages';


export const AppRoutes = () => {

    return (

        <Routes>

            <Route
                path='/'
                element={<HomePage />}
            />

            <Route
                path='profiles'
                element={
                    <PublicProfiles />}
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
