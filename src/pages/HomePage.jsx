import { useEffect } from "react";
import { useUserStore } from "../hooks/useUserStore";
import { NavLink } from 'react-router-dom';

/**
 * @author Pablo
 * @module HomePage
 */

/**
 * Pagina de principal pública de usuarios
 * @metod HomePage
 * @returns La página para visualizar los perfiles públicos de los usuarios
 */
export const HomePage = () => {

  const { loadProfiles } = useUserStore();


  const getData = async () => {

    await loadProfiles();
  };


  useEffect(() => {
    getData();

  }, []);


  return (

    <section className="secHomePage">

      <div >
        <img src="../../assets/bg1.png" alt="Imagen de portada" />
        <div>
          <h1> <NavLink to='/login'>Bienvenido a Social Connect</NavLink></h1>
        </div>
      </div>

    </section>

  );
};
