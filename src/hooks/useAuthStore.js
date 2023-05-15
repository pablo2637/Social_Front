import { useDispatch } from 'react-redux';
import { singInWithGoogle, logoutFirebase, signInWithCredentials, loginWithCredentials, changePassword } from '../firebase/services';
import { fetchDataRegister, fetchDataRegisterGoogle } from '../helpers/fetchData';
import { onChecking, onCheckingUser, onComplete, onError, onLoading, onLoginUser, onLogoutUser, onUpdateUser } from '../store/slice/authSlice';
import { onDisconnect, onLogoutChat } from '../store/slice/socketSlice'
import { onLogoutInvites } from '../store/slice/usersSlice'
import { deleteLocal, setLocal } from '../helpers/localStorage';
import { SocketContext } from '../contexts/SocketContext';
import { useContext } from 'react';
import { fetchDataChats, fetchDataEmail, fetchUpdateUser } from '../pages/user/helpers/fetchDataUser';
import { useUserStore } from './useUserStore';



/**
 * @author Pablo
 * @module useAuthStore
 */


/**
 * Hook personalizado para almacenar el state de validación del usuairo
 * @method useAuthStore
 */
export const useAuthStore = () => {


    const { socket } = useContext(SocketContext);

    const { loadInvites, loadChats } = useUserStore();
    const dispatch = useDispatch();


    /**
     * Función para hacer el registro con una cuenta de Google, luego trae los datos del usuario de la base
     * de datos de Mongo, si no existe los crea y finalmente recupera también las invitaciones y los chats
     * @method loginGoogle
     * @async
     * @returns {json} OK
     */
    const loginGoogle = async () => {

        dispatch(onCheckingUser());

        const response = await singInWithGoogle();
        if (!response.ok) {

            dispatch(onError());

            return {
                ok: false,
                response: response.response
            };
        }


        const data = await fetchDataEmail(response.user.email);

        let responseReg;
        if (!data.ok) {

            responseReg = await fetchDataRegisterGoogle(response.user);

            if (!responseReg.ok) {

                dispatch(onError());
                return {
                    ok: false,
                    response: responseReg.msg
                };
            }

        }


        const newUser = data.ok ? data.user : responseReg.user;

        dispatch(onLoginUser(newUser));
        setLocal(newUser);

        await socket.emit('whoAmI', { userID: newUser._id })

        await loadInvites();
        await loadChats(newUser._id);

        return {
            ok: true
        };

    };



    /**
     * Función para hacer el login con email y contraseña, luego recupera los datos de usuario de la base de datos de Mongo
     * y también las invitaciones y chats
     * @method loginUser
     * @async
     * @param {String} email Email del usuario
     * @param {String} password Password del usuario
     * @param {Hook} setValidate Hook para almacenar posibles errores en el login
     * @returns {json} OK
     */
    const loginUser = async ({ email, password }, setValidate) => {

        dispatch(onCheckingUser());

        let msgError;

        const response = await loginWithCredentials(email, password);
        if (!response.ok) {

            if (response.error.toString().includes('auth/wrong-password'))
                msgError = `Error al validar usuario/contraseña.`

            if (response.error.toString().includes('auth/user-not-found'))
                msgError = `Error al validar usuario/contraseña...`


            setValidate(prevValidate => ({
                ...prevValidate,
                msgError
            }));

            dispatch(onError());

            return {
                ok: false,
                response: response.response
            };
        }


        const { user } = await loadUser(email);
        console.log('next 1');
        await loadInvites();
        console.log('next 2');
        await loadChats(user._id);


        return {
            ok: true
        };

    };



    /**
     * Devuelve los datos del usuario de la base de datos de Mongo, los almacena en el local y manda un mensaje
     * a través del socket para identificar al usuario en el servidor del chat
     * @method loadUser
     * @async
     * @param {String} email Email del usuario
     * @returns {json} OK y user
     */
    const loadUser = async (email) => {

        dispatch(onCheckingUser());

        console.log('email', email)
        const data = await fetchDataEmail(email);
        console.log('data', data)

        if (!data.ok)
            return {
                ok: false,
                response: data.user
            };

        dispatch(onLoginUser(data.user));
        setLocal(data.user);


        await socket.emit('whoAmI', { userID: data.user._id });

        return {
            ok: true,
            user: data.user
        };

    };




    /**
     * Registra un usuario en la base de datos de Firebase y de MongoDB
     * @method registerUser
     * @async
     * @param {Object} formData Datos del formulario sin serializar
     * @param {Object} data Datos del formulario serializado 
     * @param {Hook} setValidate Hook para almacenar posibles errores en el registro
     * @returns {json} OK y user
     */
    const registerUser = async (formData, data, setValidate) => {

        dispatch(onCheckingUser());

        let msgError;

        const responseSignIn = await signInWithCredentials(data.email, data.password)
        if (!responseSignIn.ok) {

            if (responseSignIn.error.toString().includes('auth/email-already-in-use'))
                msgError = `El correo ${data.email} ya esta en uso.`

            if (responseSignIn.error.toString().includes('be at least 6 characters'))
                msgError = `La contraseña debe tener al menos 6 caracteres.`

            setValidate(prevValidate => ({
                ...prevValidate,
                msgError
            }));

            dispatch(onError());
            return { ok: false };
        }


        const responseLogin = await loginWithCredentials(data.email, data.password);
        if (!responseLogin.ok) {

            msgError = `Error en login con google.`
            setValidate(prevValidate => ({
                ...prevValidate,
                msgError
            }));


            dispatch(onError());
            return { ok: false };
        }

        formData.append('uid', responseSignIn.user.uid);


        const response = await fetchDataRegister(formData);
        if (!response.ok) {

            dispatch(onError());
            return {
                ok: false,
                msg: response.msg
            }
        }



        dispatch(onLoginUser(response.user));
        setLocal(response.user);

        await socket.emit('whoAmI', { userID: response.user._id })

        return {
            ok: true,
            user: response.user
        };

    };



    /**
     * Hace el logout de Firebase y borra los datos del local storage
     * @method logoutUser
     * @async
     * @returns {json} OK
     */
    const logoutUser = async () => {

        dispatch(onLogoutUser());

        const response = await logoutFirebase()

        if (!response.ok)
            return {
                ok: false,
                response
            };


        deleteLocal();
        dispatch(onLogoutChat());
        dispatch(onLogoutInvites());


        return {
            ok: true
        };

    };



    /**
     * Edita los datos del usuario: image y name
     * @method updateUserData
     * @async
     * @param {Object} formData Datos del formulario sin serializar
     * @returns {json} OK
     */
    const updateUserData = async (formData) => {

        dispatch(onLoading());

        const response = await fetchUpdateUser(formData)

        if (!response.ok) {

            dispatch(onError());
            return {
                ok: false,
                msg: response.msg
            };
        }



        dispatch(onUpdateUser(response.user));

        return {
            ok: true
        }

    };



    /**
     * Edita los datos del usuario: image y name
     * @method updatePassword
     * @async
     * @param {Object} data Datos del formulario serializado 
     * @param {Hook} setValidate Hook para almacenar posibles errores en el registro
     * @returns {json} OK
     */
    const updatePassword = async (data, setValidate) => {

        dispatch(onChecking());

        let msgErrorPass;

        const response = await changePassword(data)

        if (!response.ok) {

            if (response.error.toString().includes('auth/wrong-password'))
                msgErrorPass = `Error al validar la contraseña actual.`

            if (response.error.toString().includes('at least 6 characters'))
                msgErrorPass = `La nueva contraseña debe tener al menos 6 caracteres.`


            setValidate(prevValidate => ({
                ...prevValidate,
                msgErrorPass
            }));


            dispatch(onError());

            return {
                ok: false
            }
        }

        dispatch(onComplete());


        return {
            ok: true
        }

    };


    return {
        loginUser,
        logoutUser,
        loadUser,
        updateUserData,
        registerUser,
        updatePassword,
        loginGoogle
    };
};
