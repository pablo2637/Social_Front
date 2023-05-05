import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { Profile, Invites, Friends } from "./components";
import { useEffect } from 'react';

export const HomeUserPage = () => {

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);


  const checkProfile = () => {

    
    if (user.profile.length == 0) navigate('editPublicProfile');

  };

  useEffect(() => {
    checkProfile();

  }, []);

  return (

    <section>
      <div>
        <p>Tu cuenta</p>
      </div>

      <h1>Hola, {user.name}</h1>

      <section>

        <h2>Perfiles:</h2>
        <section>

          <h3>Público:</h3>
          <Profile profile={user.profile} />

          <NavLink to='/editPublicProfile'>Edita tu perfil público</NavLink>

        </section>


        <section>

          <h3>Privado:</h3>

          <NavLink to='/editPrivateProfile'>Edita tu perfil privado</NavLink>

        </section>

      </section>

      <NavLink to='/editData'>Edita tus datos personales</NavLink>
      <NavLink to='/meet'>Conocer Gente</NavLink>

      <h2>Invitaciones</h2>
      <Invites />

      <h2>Mis relaciones:</h2>
      <Friends />


    </section>

  )
}
