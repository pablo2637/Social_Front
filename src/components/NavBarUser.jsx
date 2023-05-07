import { useState } from 'react';
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

    const [show, setShow] = useState(false)
    const { status, user, isLoading, isChecking } = useSelector((state) => state.auth);
    const { isReceiving, isSending, isConnecting, connState } = useSelector((state) => state.socket)


    const handleOnClick = () => setShow(!show);


    return (

        <nav>
            <div className='divNavContainer'>
                <div className='divBtnMenu'>
                    <button onClick={handleOnClick}><i className={(show) ? "fa-solid fa-xmark fa-fade" : "fa-solid fa-bars"}></i></button>
                </div>

                <div className="divStatus">
                    <div>
                        {
                            (status == 'authenticated') ?
                                <img src="../../public/assets/lock-green.png" title="Usuario registrado" />
                                :
                                (status == 'admin') ?
                                    <img src="../../public/assets/lock-blue.png" title="Usuario administrador" />
                                    :
                                    <img src="../../public/assets/lock-gray.png" title="Usuario anónimo" />
                        }
                    </div>

                    <div>
                        {
                            (isChecking) ?
                                <img title="Comprobando" src="../../public/assets/user-blue.png" />
                                :
                                <img src="../../public/assets/user-gray.png" />
                        }
                    </div>

                    <div>
                        {
                            (connState == 'connected') ?
                                <img title="Conectado al servidor..." src="../../public/assets/pc-green.png" />
                                :
                                (isConnecting) ?
                                    <img title="Estableciendo conexión..." src="../../public/assets/pc-red.png" />
                                    :
                                    <img title="Desconectado..." src="../../public/assets/pc-gray.png" />
                        }
                    </div>
                </div>
            </div>

            <div className={`divNav${(show) ? ' mostrar' : ''}`}>

                <div>

                    <ul onClick={handleOnClick} id='navContainer'>
                        {
                            (user.profile.length > 0) ?
                                <>

                                    <li>
                                        <NavLink
                                            to='/'
                                            className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                                        >Home
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to='/profiles'
                                            className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                                        >Perfiles
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to='/relations'
                                            className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                                        >Mis Relaciones
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to='/editPublicProfile'
                                            className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                                        >Tu Perfil Público
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to='/editPrivateProfile'
                                            className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                                        >Tu Perfil Privado
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to='/editData'
                                            className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                                        >Datos Personales
                                        </NavLink>
                                    </li>


                                    <li>
                                        <NavLink
                                            to='/meet'
                                            className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                                        >Conocer Gente
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to='/logout'
                                            className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                                        >Cerrar Sesión
                                        </NavLink>
                                    </li>

                                </>
                                :
                                <>

                                    <li>
                                        <NavLink
                                            to='/editPublicProfile'
                                            className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                                        >Tu Perfil Público
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to='/logout'
                                            className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                                        >Cerrar Sesión
                                        </NavLink>
                                    </li>

                                </>
                        }
                    </ul>

                </div>

            </div>
        </nav>

    );
};