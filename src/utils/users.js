import { get, ref, set } from 'firebase/database'; 
import { db } from './firebase.js';

export const createUser = (uid, name, email, favorites = []) => {
    const userRef = ref(db, `users/${uid}`);
      const newUser = {
        username: name,
        email: email,
        favorites: favorites
      };
    
    return set(userRef, newUser)
        .then(() => {
            console.log('New user added successfully');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        }); 
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
                console.log('No favorites found');
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
    const userRef = ref(db, `users/${uid}/favorites`);
    return set(userRef, newFavorites)
        .then(() => {
            console.log('Favorites updated successfully.');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
};