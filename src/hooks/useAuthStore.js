import { useDispatch } from 'react-redux';
import { singInWithGoogle, logoutFirebase, signInWithCredentials, loginWithCredentials } from '../firebase/services';
import { fetchDataEmail, fetchDataRegister, fetchDataRegisterGoogle } from '../helpers/fetchData';
import { onCheckingUser, onError, onLoginUser, onLogoutUser } from '../store/slice/authSlice';
import { deleteLocal, setLocal } from '../helpers/localStorage';

export const useAuthStore = () => {

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


        const data = await fetchDataEmail(email);

        if (!data.ok)
            return {
                ok: false,
                response: data.user
            };


        dispatch(onLoginUser(data.user));
        setLocal(data.user);

        return {
            ok: true
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

        return {
            ok: true
        };

    };


    return {
        loginUser,
        logoutUser,
        registerUser,
        loginGoogle
    };
};
