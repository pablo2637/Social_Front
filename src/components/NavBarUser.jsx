import { NavLink } from 'react-router-dom';


export const NavBarUser = () => {

    return (

        <nav>
            <div className='divNavContainer'>

                <div>
                    <NavLink
                        to='/'
                        className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                    >Home
                    </NavLink>

                    <NavLink
                        to='/editProfile'
                        className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                    >Edita tu perfil
                    </NavLink>

                    <NavLink
                        to='/editData'
                        className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                    >Edita tus datos personales
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

                </div>

            </div>
        </nav>

    );
};