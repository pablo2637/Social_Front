import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import { EditProfile, Profile } from "./components";

export const HomeUserPage = () => {

  const { status, user, isChecking } = useSelector((state) => state.auth);

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

            <NavLink to='/edit'>Edita tu perfil</NavLink>
          </div>

          :

          <EditProfile />
      }

    </section>

  )
}
