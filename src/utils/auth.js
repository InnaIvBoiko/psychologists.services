import { auth } from './firebase.js';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";


export const createAccount = async ({ email, password, name }) => {
    const loginEmail = email;
    const loginPassword = password;
    const displayName = name;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword, displayName);
        console.log(userCredential.user);
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    };
};
 

export const loginEmailPassword = async ({ email, password }) => {
    const loginEmail = email;
    const loginPassword = password;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log(userCredential.user);
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    };
};

export const monitorAuthState = async () => {
    await onAuthStateChanged(auth, user => {
        if (user) {
            console.log(user);
        } else {
            console.log('You are not logged in')
        };
    });
};

export const logout = async () => {
    await signOut(auth);
}; 