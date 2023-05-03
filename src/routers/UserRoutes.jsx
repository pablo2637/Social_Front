import { Route, Routes, Navigate } from 'react-router-dom';
import { EditPersonalData, EditProfile, HomeUserPage, LogoutPage, Meet, Profiles } from '../pages/user';

export const UserRoutes = () => {

  return (
    <>
      <Routes>

        <Route
          path='/'
          element={<HomeUserPage />}
        />

        <Route
          path='profiles'
          element={<Profiles />}
        />

        <Route
          path='editPublicProfile'
          element={<EditProfile />}
        />

        <Route
          path='editPrivateProfile'
          element={<EditProfile />} //modificar
        />

        <Route
          path='relations'
          element={<EditProfile />} //modificar
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
