import { get, ref, set } from 'firebase/database'; 
import { db } from './firebase.js';

export const createUser = (uid, name, email, favorites = []) => {
    const userRef = ref(db, `users/${uid}`);
    try {
        set(userRef, {
        username: name,
        email: email,
        favorites: favorites
    });
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

export const getFavoritesList = async (uid) => {
    const snapshot = await get(ref(db, `users/${uid}/favorites`));
    const favorites = snapshot.val();
    return favorites ? Object.values(favorites) : [];
};

// export const getFavoritesList = (uid) => {
//     const userRef = ref(db, `users/${uid}/favorites`);
//     return get(userRef)
//         .then((snapshot) => {
//             if (snapshot.exists()) {
//                 const favorites = snapshot.val();
//                 console.log(typeof(favorites));
//                 return favorites;
//             } else {
//                 console.log('No favorites found');
//                 return [];
//             };
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.log(errorCode, errorMessage);
//         });
// };

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