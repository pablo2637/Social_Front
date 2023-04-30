import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Profile } from "./components";
import { EditProfile } from './';

export const HomeUserPage = () => {

  const { status, user, isLoading, isChecking } = useSelector((state) => state.auth);

  return (

    <section>
      <div>
        <p>Tu cuenta</p>
      </div>

      <h1>Hola, {user.name}</h1>
      {
        (user.profile.length > 0) ?

          <div>
            <Profile profile={user.profile} />

            <NavLink to='/editProfile'>Edita tu perfil</NavLink>
            <NavLink to='/editData'>Edita tus datos personales</NavLink>
          </div>

          :

          <EditProfile />
      }

    </section>

  )
}
