import { NavLink } from 'react-router-dom';

export const NavBar = () => {

    return (

        <nav>
            <div className='divNavContainer'>

                <div>
                    <NavLink to='/'
                        className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                    >Home
                    </NavLink>

                    <NavLink to='/login'
                        className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                    >Login
                    </NavLink>

                    <NavLink to='/register'
                        className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                    >Registrarse
                    </NavLink>

                </div>

            </div>
        </nav>

    );
};
