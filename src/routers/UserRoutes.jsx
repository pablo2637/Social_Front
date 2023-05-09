import { Route, Routes, Navigate } from 'react-router-dom';
import {
  EditPersonalData,
  EditPrivateProfile,
  EditProfile,
  HomeUserPage,
  LogoutPage,
  Meet,
  Messages,
  Profiles,
  Relations
} from '../pages/user';


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
          element={<EditPrivateProfile />}
        />

        <Route
          path='relations'
          element={<Relations />}
        />

        <Route
          path='messages'
          element={<Messages />}
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
