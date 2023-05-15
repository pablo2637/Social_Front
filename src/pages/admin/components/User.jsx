import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Message } from "../../user/components";
import { useAdmin } from "../hooks/useAdmin";
import { getUserData } from "../../user/helpers/getUserData";
import { useInvites } from "../../user/hooks/useInvites";
import { NavLink } from "react-router-dom";


/**
 * @author Pablo
 * @module User
 */

/**
 * Componente que renderiza un usuario
 * @method User
 * @param {String} _id El ID del usuario a mostrar
 * @returns Todos los datos del usuario, con opción de enviarle un mensaje o eliminarlo
 */
export const User = ({ _id }) => {

    const { users, invites, profiles } = useSelector((state) => state.users);
    const [userAdm, setUserAdmn] = useState([]);

    const [myInvitesSent, setMyInvitesSent] = useState([]);
    const [myInvitesReceived, setMyInvitesReceived] = useState([]);

    const {
        handleRemove
    } = useInvites();

    const {
        msg,
        handleOnRemoveUser,
        handleOnAttemptToRemove,
        handleOnWriteMessage,
        sendMsg,
        warning
    } = useAdmin();


    const getFriendName = friendID => {

        const friend = users.find(u => u._id == friendID)?.name;

        return friend;
    };


    const filterInvites = () => {

        const filterS = [];
        const filterR = [];
        invites.forEach(inv => {

            if (inv.sender == _id) {
                const data = getUserData(inv.receiver, profiles);
                if (!data) return
                const { name, image } = data
                filterS.push({ ...inv, name, image })


            } else if (inv.receiver == _id) {
                const data = getUserData(inv.sender, profiles);
                if (!data) return
                const { name, image } = data
                filterR.push({ ...inv, name, image })
            }

        });

        setMyInvitesSent(filterS);
        setMyInvitesReceived(filterR);

    };



    const loadUser = async () => {

        if (!users) {
            const response = await getUsers();

            if (!response.ok)
                console.log('Error al cargar los usuarios', response.msg)
        }

        const newUser = users.find(u => u._id == _id);

        if (!newUser) return

        setUserAdmn(newUser);

    };


    useEffect(() => {
        console.log('filter')
        filterInvites();

    }, [invites]);


    useEffect(() => {
        loadUser();
        filterInvites();

    }, [_id]);


    return (

        <article className="artUser" key={`adminUser${_id}`}>

            {(userAdm._id) &&
                <>
                    <header>

                        <h3>{userAdm.name}</h3>
                        <div className="divUserImage">
                            <NavLink to={`/detail/${_id}`} >
                                <img src={userAdm.image} alt={`Imagen de ${userAdm.name}`} />
                            </NavLink>
                        </div>

                    </header>


                    <main>

                        <div className="divUser">

                            <p>_ID: {userAdm._id}</p>
                            <p>UID: {userAdm.uid}</p>
                            <p>Email: {userAdm.email}</p>

                            <h4>Relaciones:</h4>

                            <ul>
                                {
                                    (userAdm.friends) &&
                                    userAdm.friends.map(fr =>
                                        <li key={`a${fr}${Date.now()}`}><NavLink to={`/detail/${fr}`} >{getFriendName(fr)}</NavLink></li>
                                    )
                                }
                            </ul>


                            <h4>Invitaciones:</h4>

                            <section className="secInvites">

                                <h5>Enviadas:</h5>
                                {
                                    (myInvitesSent.length > 0) ?

                                        myInvitesSent.map(inv =>

                                            <article key={inv.receiver + inv._id}>
                                                <p>A: <NavLink to={`/detail/${inv.receiver}`} >{inv.name}</NavLink></p>
                                                <p>{new Date(inv.date).toLocaleString()} hrs.</p>

                                                <button
                                                    onClick={() => handleRemove(inv._id, true)}
                                                ><i className="fa-solid fa-trash"></i>
                                                </button>
                                            </article>

                                        )

                                        :
                                        <p>---</p>
                                }


                            </section>


                            <section className="secInvites">

                                <h5>Recibidas:</h5>

                                {

                                    (myInvitesReceived.length > 0) ?

                                        myInvitesReceived.map(inv =>

                                            <article key={inv.sender + inv._id}>
                                                <p>De: <NavLink to={`/detail/${inv.sender}`} >{inv.name}</NavLink></p>
                                                <p>{new Date(inv.date).toLocaleString()} hrs.</p>

                                                <button
                                                    onClick={() => handleRemove(inv._id, true)}
                                                ><i className="fa-solid fa-trash"></i>
                                                </button>
                                            </article>

                                        )

                                        :
                                        <p>---</p>
                                }

                            </section>


                        </div>

                        <div className="divBtns">
                            {
                                (sendMsg) ?

                                    <button
                                        onClick={handleOnWriteMessage}
                                    ><i className="fa-solid fa-rectangle-xmark"></i> Cancelar Envío
                                    </button>

                                    :

                                    <button
                                        onClick={handleOnWriteMessage}
                                    ><i className="fa-solid fa-envelope"></i> Enviar Mensaje
                                    </button>
                            }

                            {
                                (warning) ?

                                    <button
                                        onClick={handleOnAttemptToRemove}
                                    ><i className="fa-solid fa-rectangle-xmark"></i> Cancelar Eliminar
                                    </button>

                                    :

                                    <button
                                        onClick={handleOnAttemptToRemove}
                                    ><i className="fa-solid fa-user-minus"></i> Eliminar Usuario
                                    </button>
                            }


                        </div>

                        {(warning) &&
                            <div className="divWarning">
                                <p>¿Estas seguro de eliminar a este usuario?</p>

                                <div className="divBtns">
                                    <button
                                        onClick={() => handleOnRemoveUser(userAdm._id, userAdm.uid)}
                                    >Sí <i className="fa-solid fa-skull-crossbones"></i>
                                    </button>
                                    <button
                                        onClick={handleOnAttemptToRemove}
                                    >No <i className="fa-solid fa-rectangle-xmark"></i>
                                    </button>
                                </div>
                            </div>
                        }

                        {
                            (sendMsg) &&
                            <Message {...userAdm} isAdmin={true} />
                        }
                    </main>

                </>
            }

        </article>
    )
}