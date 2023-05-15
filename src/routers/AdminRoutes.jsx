import { Route, Routes, Navigate } from 'react-router-dom';
import { HomePageAdmin, UserDetail, Users } from '../pages/admin';
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
                    path='detail/:_id'
                    element={<UserDetail />}
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
