import { Route, Routes, Navigate } from 'react-router-dom';
import { HomePageAdmin, Users } from '../pages/admin';
import { LogoutPage } from '../pages/user';


export const AdminRoutes = () => {

    return (
        <>
            <Routes>

                <Route
                    path='/'
                    element={<HomePageAdmin />}
                />

                <Route
                    path='users'
                    element={<Users />}
                />

                <Route
                    path='logout'
                    element={<LogoutPage />}
                />

                <Route path='/*' element={<Navigate to={'/'} />} />

            </Routes>

        </>

    )
}
