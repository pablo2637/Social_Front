import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Chats, Friends } from '../pages/user/components';


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

    const [show, setShow] = useState(false);
    const [showChat, setShowChat] = useState(false);

    const navigate = useNavigate();

    const { status, user, newMsgs, isLoading, isChecking } = useSelector((state) => state.auth);
    const { newInvites, newProfiles } = useSelector((state) => state.users);
    const { newChats, isReceiving, isSending, isConnecting, connState } = useSelector((state) => state.socket)


    const handleOnShow = () => setShow(!show);

    const handleOnChat = () => setShowChat(!showChat);


    return (

        <nav>
            <div className='divNavContainer'>
                <div className='divBtnMenu'>
                    <button onClick={handleOnShow}><i className={(show) ? "fa-solid fa-xmark fa-fade" : "fa-solid fa-bars"}></i></button>
                </div>


                <div className='divNotifications'>
                    <div>
                        {
                            (newInvites) ?
                                <img src="../../assets/user-inv-green.png" title="Tienes nuevas invitaciones" />
                                :
                                <img src="../../assets/user-inv-gray.png" title="No tienes invitaciones nuevas" />
                        }
                    </div>

                    <div>
                        {
                            (newChats) ?
                                <img onClick={handleOnChat} src="../../assets/users-green.png" title="Tienes nuevos mensajes en tus chats" />
                                :
                                <img onClick={handleOnChat} src="../../assets/users-gray.png" title="No hay nuevos mensajes en tus chats" />
                        }
                    </div>

                    <div>
                        {
                            (newProfiles) ?
                                <img src="../../assets/sc-ico-green.png" title="Hay nuevos perfiles de usuarios" />
                                :
                                <img src="../../assets/sc-ico-gray.png" title="No hay nuevos perfiles de usuarios" />
                        }
                    </div>

                    <div>
                        {
                            (newMsgs) ?
                                <img src="../../assets/user-msgs-green.png" title="Hay nuevos mensajes privados" />
                                :
                                <img src="../../assets/user-msgs-gray.png" title="No hay nuevos mensajes privados" />
                        }
                    </div>

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
                                <img title={(isChecking) ? "Comprobando..." : "Intentando reconectar..."} src="../../assets/user-blue.png" />
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


            <div className={`divChat${(showChat) ? ' mostrarChat' : ''}`}>
                <Friends />

            </div>

            <div className={`divNav${(show) ? ' mostrar' : ''}`}>

                <div>

                    <ul onClick={handleOnShow} id='navContainer'>
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