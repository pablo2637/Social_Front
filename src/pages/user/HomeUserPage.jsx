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

    <section className='secHomeUser'>

      <div className='divRoot'>
        <p>&gt; Tu cuenta</p>
      </div>

      <h1>Hola, {user.name}!</h1>

      <section className='secUserProfiles'>

        <h2>Tus Perfiles:</h2>

        <section className='secUserProfile'>

          <h3>Público:</h3>
          <Profile profile={user.profile} />

          <NavLink to='/editPublicProfile'>Edita tu perfil público</NavLink>

        </section>

        <section className='secUserProfile'>

          <h3>Privado:</h3>
          <Profile profile={user.privateProfile} />

          <NavLink to='/editPrivateProfile'>Edita tu perfil privado</NavLink>

        </section>

      </section>
      {/* 
      <NavLink to='/editData'>Edita tus datos personales</NavLink>
      <NavLink to='/meet'>Conocer Gente</NavLink> */}

      <Invites />



    </section>

  )
}
