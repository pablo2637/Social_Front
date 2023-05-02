import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";

import { Profile, Invites, Friends } from "./components";
import { EditProfile } from './';

export const HomeUserPage = () => {

  const { user } = useSelector((state) => state.auth);

  return (

    <section>
      <div>
        <p>Tu cuenta</p>
      </div>


      <h1>Hola, {user.name}</h1>
      {
        (user.profile.length > 0) ?

          <section>

            <h2>Perfiles:</h2>
            <section>

              <h3>Público:</h3>
              <Profile profile={user.profile} />

              <NavLink to='/editProfile'>Edita tu perfil público</NavLink>

            </section>


            <section>

              <h3>Privado:</h3>

              <NavLink to='/editProfile'>Edita tu perfil privado</NavLink>

            </section>

          </section>

          :

          <EditProfile />
      }

      <NavLink to='/editData'>Edita tus datos personales</NavLink>
      <NavLink to='/meet'>Conocer Gente</NavLink>

      <h2>Invitaciones</h2>
      <Invites />

      <h2>Mis relaciones:</h2>
      <Friends />


    </section>

  )
}
