import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import { auth } from './firebase.js';
import { createUser } from './users.js';


export const createAccount = async ({ email, password, name }) => {
    const loginEmail = email;
    const loginPassword = password;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
        createUser(userCredential.user.uid, name, email);
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    };
};
 

export const loginEmailPassword = async ({ email, password }) => {
    const loginEmail = email;
    const loginPassword = password;

    try {
        await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    };
};

export const monitorAuthState = (setIsLogin, setUserId) => {
    try {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserId(user.uid);
            setIsLogin(true);
        } else {
            setIsLogin(false);
            setUserId(null);
        }
    });
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    };
    
};

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    };
}; 