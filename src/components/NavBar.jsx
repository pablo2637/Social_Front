import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

/**
 * @author Pablo
 * @module NavBar
 */

/**
 * Componente que renderiza la barra de navegación pública
 * @method NavBar
 * @returns La barra de navegación genéroca de la app
 */
export const NavBar = () => {

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
                                <img src="../../assets/lock-green.png" title="Usuario registrado" />
                                :
                                (status == 'admin') ?
                                    <img src="../../assets/lock-blue.png" title="Usuario administrador" />
                                    :
                                    <img src="../../assets/lock-gray.png" title="Usuario anónimo" />
                        }
                    </div>

                    <div>
                        {
                            (isChecking || isConnecting) ?
                                <img title={(isChecking)?"Comprobando...":"Intentando reconectar..."} src="../../assets/user-blue.png" />
                                :
                                <img src="../../assets/user-gray.png" />
                        }
                    </div>

                    <div>
                        {
                            (connState == 'connected') ?
                                <img title="Conectado al servidor..." src="../../assets/pc-green.png" />
                                :
                                (isConnecting) ?
                                    <img title="Error en la conexión..." src="../../assets/pc-red.png" />
                                    :
                                    <img title="Desconectado..." src="../../assets/pc-gray.png" />
                        }
                    </div>
                </div>
            </div>

            <div className={`divNav${(show) ? ' mostrar' : ''}`}>

                <div>

                    <ul onClick={handleOnClick} id='navContainer'>

                        <li>
                            <NavLink to='/'
                                className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                            >Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to='/profiles'
                                className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                            >Perfiles
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to='/login'
                                className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                            >Login
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to='/register'
                                className={({ isActive }) => `nav-link ${isActive ? 'isActive' : ''}`}
                            >Registrarse
                            </NavLink>
                        </li>

                    </ul>

                </div>

            </div>
        </nav >

    );
};
