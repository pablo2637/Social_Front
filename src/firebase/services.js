import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getAuth,
    signOut,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updateCurrentUser,
    deleteUser,
    updatePassword
} from 'firebase/auth'
import { FirebaseAuth } from './config'


/**
 * @author Pablo
 * @module services
 */

/**
 * Provider para la conexión con Firebase
 */
const googleProvider = new GoogleAuthProvider()



/**
 * Revalida la conexión del usuario con Firebase para poder actualizar la contraseña o eliminar el usuario
 * @method recheckPassword
 * @async
 * @param {String} password El password del usuario
 * @param {Object} auth Objeto de autenticación para interactucar con Firebase
 * @returns {Object} Con las credenciales para validar un usuario
 */
const recheckPassword = async (password, auth) => {

    const user = auth.currentUser;
    const cred = EmailAuthProvider.credential(user.email, password);

    return await reauthenticateWithCredential(user, cred);
};



/**
 * Cambia la contraseña del usuario en Firebase
 * @method changePassword
 * @async
 * @param {String} password El nuevo password del usuario
 * @param {String} oldPassword El password actual del usuario
 * @returns {json} OK y msg
 * @throws {json} Error
 */
export const changePassword = async ({ password, oldPassword }) => {

    try {

        const auth = getAuth();

        const { user } = await recheckPassword(oldPassword, auth);

        await FirebaseAuth.updateCurrentUser(auth.currentUser);
        await updatePassword(user, password)

        return {
            ok: true,
            msg: 'Password actualizado con éxito'
        }

    } catch (e) {
        if (!e.toString().includes('auth/wrong-password'))
            console.log('changePassowrd error:', e);

        return {
            ok: false,
            msg: 'changePassowrd error',
            error: e
        };
    };

};




/**
 * Crea un usuario de Firebase utilizando una cuenta de Google
 * @method singInWithGoogle
 * @async
 * @returns {json} OK y user: con los datos del usuario generado
 * @throws {json} Error
 */
export const singInWithGoogle = async () => {

    try {

        googleProvider.setCustomParameters({ prompt: 'select_account' });

        const { user } = await signInWithPopup(FirebaseAuth, googleProvider);

        return {
            ok: true,
            user: {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                image: user.photoURL,
                password: 'googleAuth'
            }
        };

    } catch (e) {
        if (!e.toString().includes('auth/popup-closed-by-user') &&
            !e.toString().includes('at least 6 characters'))
            console.log('singInWithGoogle error:', e);

        return {
            ok: false,
            msg: 'singInWithGoogle error',
            error: e
        };

    };
};





/**
 * Crea un usuario de Firebase utilizando email y password
 * @method signInWithCredentials
 * @async
 * @param {String} email Email del usuario a crear
 * @param {String} password Contraseña del usuario
 * @returns {json} OK y user: con los datos del usuario generado
 * @throws {json} Error
 */
export const signInWithCredentials = async (email, password) => {

    try {
        const { user } = await createUserWithEmailAndPassword(FirebaseAuth, email, password);

        return {
            ok: true,
            user: {
                uid: user.uid,
                email: user.email
            }
        };

    } catch (e) {
        if (!e.toString().includes('auth/email-already-in-use'))
            console.log('signInWithCredentials error:', e);

        return {
            ok: false,
            msg: 'signInWithCredentials error',
            error: e
        };

    };
};




/**
 * Login de usuario en Firebase con email y password
 * @method loginWithCredentials
 * @async
 * @param {String} email Email del usuario 
 * @param {String} password Contraseña del usuario
 * @returns {json} OK y user: con los datos del usuario 
 * @throws {json} Error
 */
export const loginWithCredentials = async (email, password) => {

    try {
        const { user } = await signInWithEmailAndPassword(FirebaseAuth, email, password);

        return {
            ok: true,
            user: {
                uid: user.uid,
                email: user.email
            }
        };

    } catch (e) {
        if (!e.toString().includes('auth/wrong-password')
            && !e.toString().includes('auth/user-not-found'))
            console.log('loginWithCredentials error:', e);

        return {
            ok: false,
            msg: 'loginWithCredentials error',
            error: e
        };

    };
};




/**
 * Logout de Firebase
 * @method logoutFirebase
 * @async
 * @returns {json} OK
 * @throws {json} Error
 */
export const logoutFirebase = async () => {

    try {

        const auth = getAuth();
        await signOut(auth);

        return {
            ok: true
        };

    } catch (e) {
        console.log('logoutFirebase error:', e);

        return {
            ok: false,
            msg: 'logoutFirebase error',
            error: e
        };

    };
};