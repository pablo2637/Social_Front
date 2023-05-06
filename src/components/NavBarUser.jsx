import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';


/**
 * @author Pablo
 * @module NavBarUser
 */

/**
 * Componente que renderiza la barra de navegación de los usuarios registrados
 * @method NavBarUser
 * @returns La barra de navegación genéroca de la app
 */
export const NavBarUser = () => {

    const { user } = useSelector((state) => state.auth);

    return (

        <nav>
            <div className='divNavContainer'>

                <div>
                    {
                        (user.profile.length > 0) ?
                            <>
                                <NavLink
                                    to='/'
                                    className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                                >Home
                                </NavLink>

                                <NavLink
                                    to='/profiles'
                                    className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                                >Perfiles
                                </NavLink>

                                <NavLink
                                    to='/relations'
                                    className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                                >Mis Relaciones
                                </NavLink>

                                <NavLink
                                    to='/editPublicProfile'
                                    className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                                >Tu Perfil Público
                                </NavLink>

                                <NavLink
                                    to='/editPrivateProfile'
                                    className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                                >Tu Perfil Privado
                                </NavLink>

                                <NavLink
                                    to='/editData'
                                    className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                                >Datos Personales
                                </NavLink>


                                <NavLink
                                    to='/meet'
                                    className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                                >Conocer Gente
                                </NavLink>

                                <NavLink
                                    to='/logout'
                                    className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                                >Cerrar Sesión
                                </NavLink>
                            </>
                            :
                            <>
                                <NavLink
                                    to='/editPublicProfile'
                                    className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                                >Tu Perfil Público
                                </NavLink>

                                <NavLink
                                    to='/logout'
                                    className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                                >Cerrar Sesión
                                </NavLink>

                            </>
                    }

                </div>

            </div>
        </nav>

    );
};