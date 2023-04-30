import { Route, Routes, Navigate } from 'react-router-dom';
import { HomeUserPage, LogoutPage } from '../pages/user';
import { EditProfile } from '../pages/user/components/EditProfile';


export const UserRoutes = () => {

  return (
    <Routes>

      <Route
        path='/'
        element={<HomeUserPage />}
      />

      <Route
        path='edit'
        element={<EditProfile />}
      />

      <Route
        path='logout'
        element={<LogoutPage />}
      />

      <Route path='/*' element={<Navigate to={'/'} />} />

    </Routes>
  )
}
