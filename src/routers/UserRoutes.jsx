import { Route, Routes, Navigate } from 'react-router-dom';
import { EditPersonalData, EditProfile, HomeUserPage, LogoutPage, Meet } from '../pages/user';

export const UserRoutes = () => {

  return (
    <>
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
          path='meet'
          element={<Meet />}
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
