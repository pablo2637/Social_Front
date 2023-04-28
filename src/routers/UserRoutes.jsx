import { Route, Routes, Navigate } from 'react-router-dom';
import { HomeUserPage, LogoutPage } from '../pages/user';


export const UserRoutes = () => {

  return (
    <Routes>

      <Route
        path='/'
        element={<HomeUserPage />}
      />

      <Route
        path='logout'
        element={<LogoutPage />}
      />

      <Route path='/*' element={<Navigate to={'/'} />} />

    </Routes>
  )
}
