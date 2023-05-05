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

export const useAuthStore = () => {


    const { socket } = useContext(SocketContext);

    const { loadInvites, loadChats } = useUserStore();
    const dispatch = useDispatch();


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

            if (!responseReg.ok)
                return {
                    ok: false,
                    response: responseReg.msg
                };
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


        // const data = await fetchDataEmail(email);

        // if (!data.ok)
        //     return {
        //         ok: false,
        //         response: data.user
        //     };


        // dispatch(onLoginUser(data.user));
        // setLocal(data.user);

        const { user } = await loadUser(email);
        await loadInvites();
        await loadChats(user._id);

        // const chats = await fetchDataChats(data.user._id);

        // if (!chats.ok)
        //     return {
        //         ok: false,
        //         response: chats.msg
        //     };


        // dispatch(onLoadChats(chats.chats));


        // socket.emit('whoAmI', { userID: data.user._id });

        return {
            ok: true
        };

    };



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


        // const chats = await fetchDataChats(user._id);

        // if (!chats.ok)
        //     return {
        //         ok: false,
        //         response: chats.msg
        //     };


        // dispatch(onLoadChats(chats.chats));
        await socket.emit('whoAmI', { userID: data.user._id });

        return {
            ok: true,
            user: data.user
        };

    };


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

            return { ok: false };
        }


        const responseLogin = await loginWithCredentials(data.email, data.password);
        if (!responseLogin.ok) {

            msgError = `Error en login con google.`
            setValidate(prevValidate => ({
                ...prevValidate,
                msgError
            }));

            return { ok: false };
        }

        formData.append('uid', responseSignIn.user.uid);


        const response = await fetchDataRegister(formData);
        if (!response.ok)
            return {
                ok: false,
                msg: response.msg
            }


        dispatch(onLoginUser(response.user));
        setLocal(response.user);

        await socket.emit('whoAmI', { userID: response.user._id })

        return {
            ok: true,
            user: response.user
        };

    };


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



    const updateUserData = async (formData) => {

        dispatch(onLoading());

        const response = await fetchUpdateUser(formData)

        if (!response.ok)
            return {
                ok: false,
                msg: response.msg
            }


        dispatch(onUpdateUser(response.user));

        return {
            ok: true
        }

    };


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
