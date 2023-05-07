import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteUser } from "../helpers/fetchDataAdmin";
import { useState } from "react";

/**
 * @author Pablo
 * @module useAdmin
 */


/**
 * Hook personalizado para gestionar las operacioens con del administrador con los usuarios
 * @method useAuthStore
 */
export const useAdmin = () => {

    const { status, user, isChecking } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [msg, setMsg] = useState(null);
    const [warning, setWarning] = useState(false);
    const [sendMsg, setSendMsg] = useState(false)


    const handleOnAttemptToRemove = () => setWarning(!warning);


    const handleOnWriteMessage = () => setSendMsg(!sendMsg);


    const handleOnRemoveUser = async (_id, uid) => {

        const response = await fetchDeleteUser(_id, uid);

        if (!response.ok)
            console.log()

    }

    return {
        handleOnRemoveUser,
        handleOnAttemptToRemove,
        handleOnWriteMessage,
        sendMsg,
        msg,
        warning
    }

};
