import { Route, Routes, Navigate } from 'react-router-dom';
import { EditPersonalData, EditProfile, HomeUserPage, LogoutPage } from '../pages/user';


export const UserRoutes = () => {

  return (
    <Routes>

      <Route
        path='/'
        element={<HomeUserPage />}
      />

      <Route
        path='editProfile'
        element={<EditProfile />}
      />

      <Route
        path='editData'
        element={<EditPersonalData />}
      />

      <Route
        path='logout'
        element={<LogoutPage />}
      />

      <Route path='/*' element={<Navigate to={'/'} />} />

    </Routes>
  )
}
