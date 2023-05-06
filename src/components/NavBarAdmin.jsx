import { NavLink } from 'react-router-dom';

/**
 * @author Pablo
 * @module NavBarAdmin
 */

/**
 * Componente que renderiza la barra de navegación del administrador
 * @method NavBarAdmin
 * @returns La barra de navegación genéroca de la app
 */
export const NavBarAdmin = () => {

    return (

        <nav>
            <div className='divNavContainer'>

                <div>
                    <>
                        <NavLink
                            to='/'
                            className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                        >Dashboard
                        </NavLink>

                        <NavLink
                            to='/users'
                            className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                        >Usuarios
                        </NavLink>

                        <NavLink
                            to='/logout'
                            className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                        >Cerrar Sesión
                        </NavLink>

                    </>
                </div>

            </div>
        </nav>

    );
};