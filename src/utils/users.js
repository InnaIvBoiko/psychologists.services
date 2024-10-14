import { get, ref, set } from 'firebase/database'; 
import { db } from './firebase.js';

export const createUser = (uid, name, email, favorites = []) => {
    try {
        const userRef = ref(db, `users/${uid}`);
        const newUser = {
            username: name,
            email: email,
            favorites: favorites
        };
        return set(userRef, newUser);  
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    };
};

export const getUsername = (uid) => {
    const userRef = ref(db, `users/${uid}/username`);
    return get(userRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const username = snapshot.val();
                return username;
            } else {
                return null;
            };
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
};


export const getFavoritesList = (uid) => {
    const userRef = ref(db, `users/${uid}/favorites`);
    return get(userRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const favorites = snapshot.val();
                return Object.values(favorites)
            } else {
                return [];
            };
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
};

export const updateUserFavorites = (uid, newFavorites) => {
    try {
        const userRef = ref(db, `users/${uid}/favorites`);
        return set(userRef, newFavorites)
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    };
};