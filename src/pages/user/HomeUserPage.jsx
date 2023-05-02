import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";

import { Profile } from "./components";
import { EditProfile } from './';
import { Invites } from './components/Invites';


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

            <section>

              <h2>Perfil Público:</h2>
              <Profile profile={user.profile} />

              <NavLink to='/editProfile'>Edita tu perfil público</NavLink>

            </section>


            <section>

              <h2>Perfil Privado:</h2>

              <NavLink to='/editProfile'>Edita tu perfil privado</NavLink>

            </section>

          </div>

          :

          <EditProfile />
      }

      <NavLink to='/editData'>Edita tus datos personales</NavLink>
      <NavLink to='/meet'>Conocer Gente</NavLink>

      <Invites />

    </section>

  )
}
