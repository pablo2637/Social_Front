import { NavLink } from 'react-router-dom';


export const NavBarUser = () => {

    return (

        <nav>
            <div className='divNavContainer'>

                <div>
                    <NavLink to='/'
                        className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                    >Home
                    </NavLink>

                    <NavLink to='/logout'
                        className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                    >Cerrar Sesión
                    </NavLink>

                </div>

            </div>
        </nav>

    );
};