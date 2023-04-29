import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getAuth,
    signOut
} from 'firebase/auth'
import { FirebaseAuth } from './config'



const googleProvider = new GoogleAuthProvider()

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
        if (!e.toString().includes('auth/popup-closed-by-user'))
            console.log('singInWithGoogle error:', e);

        return {
            ok: false,
            msg: 'singInWithGoogle error',
            error: e
        };

    };
};


export const signInWithCredentials = async (email, password) => {
    console.log('email+password', email, password)

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