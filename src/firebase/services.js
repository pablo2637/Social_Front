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
    updatePassword
} from 'firebase/auth'
import { FirebaseAuth } from './config'


const googleProvider = new GoogleAuthProvider()

const recheckPassword = async (password, auth) => {

    const user = auth.currentUser;
    const cred = EmailAuthProvider.credential(user.email, password);

    return await reauthenticateWithCredential(user, cred);
}


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
        console.log('signInWithCredentials error:', e);

        return {
            ok: false,
            msg: 'signInWithCredentials error',
            error: e
        };

    };
};



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
        if (!e.toString().includes('auth/wrong-password'))
            console.log('loginWithCredentials error:', e);

        return {
            ok: false,
            msg: 'loginWithCredentials error',
            error: e
        };

    };
};



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