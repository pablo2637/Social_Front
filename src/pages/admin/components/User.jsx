import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Message, Profile } from "../../user/components";
import { useAdmin } from "../hooks/useAdmin";


/**
 * @author Pablo
 * @module User
 */

/**
 * Componente que renderiza un usuario
 * @metod User
 * @param {String} _id El ID del usuario a mostrar
 * @returns Todos los datos del usuario, con opción de enviarle un mensaje o eliminarlo
 */
export const User = ({ _id }) => {

    const { users } = useSelector((state) => state.users);
    const [userAdm, setUserAdmn] = useState([]);

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
        loadUser();

    }, []);


    return (
        <article key={Date.now()}>

            <p>{msg}</p>

            {(userAdm._id) &&
                <>
                    <div>

                        <h3>Nombre: {userAdm.name}</h3>
                        <p>_ID: {userAdm._id}</p>
                        <p>UID: {userAdm.uid}</p>
                        <p>Email: {userAdm.email}</p>
                        <p>Relaciones:</p>
                        <ul>
                            {
                                (userAdm.friends) &&
                                userAdm.friends.map(fr =>
                                    <li key={`a${fr}${Date.now()}`}><button>{getFriendName(fr)}</button></li>
                                )
                            }
                        </ul>
                        <div>
                            <img src={userAdm.image} alt={`Imagen de ${userAdm.name}`} width={50} />
                        </div>

                        <Profile key={`pd${userAdm.uid}${Date.now()}`} profile={userAdm.profile} />


                    </div>
                    <div>
                        {
                            (sendMsg) ?
                                <button onClick={handleOnWriteMessage} >Cancelar Mensaje</button>
                                :
                                <button onClick={handleOnWriteMessage} >Enviar Mensaje</button>
                        }

                        <button disabled={(warning) ? true : false} onClick={handleOnAttemptToRemove} >Eliminar Usuario</button>
                    </div>

                    {(warning) &&
                        <div>
                            <p>¿Estas seguro de eliminar a este usuario?</p>
                            <button onClick={() => handleOnRemoveUser(userAdm._id, userAdm.uid)}>Sí, Eliminar</button>
                            <button onClick={handleOnAttemptToRemove} >No, Cancelar</button>
                        </div>
                    }

                    {
                        (sendMsg) &&
                        <Message {...userAdm} />
                    }
                </>
            }

        </article>
    )
}