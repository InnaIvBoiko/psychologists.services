import { db } from './firebase.js';
import { ref, get } from 'firebase/database';

export const getInitialData = () => {
    const userRef = ref(db, `psychologists`);
    return get(userRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const psychologistsList = snapshot.val();
                return psychologistsList;
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

// const itemsPerPage = 3; 

// export const loadInitialData = (setLoading, setPsychologists, setLastKey, setIsEnd, filter) => {
//     setLoading(true);

//     let psychologistsQuery;

//     switch(filter) {
//         case 'nameASC': 
//             psychologistsQuery = query(ref(db, 'psychologists'), orderByChild('name'), limitToFirst(itemsPerPage));
//             break;
//         case 'nameDES':
//             psychologistsQuery = query(ref(db, 'psychologists'), orderByChild('name'), limitToFirst(itemsPerPage));
//             break;
//         case 'priceASC': 
//             psychologistsQuery = query(ref(db, 'psychologists'), orderByChild('price_per_hour'), limitToFirst(itemsPerPage));
//             break;
//         case 'priceDES': 
//             psychologistsQuery = query(ref(db, 'psychologists'), orderByChild('price_per_hour'), limitToFirst(itemsPerPage));
//             break;
//         case 'ratingASC': 
//             psychologistsQuery = query(ref(db, 'psychologists'), orderByChild('rating'), limitToFirst(itemsPerPage));
//             break;
//         case 'ratingDES': 
//             psychologistsQuery = query(ref(db, 'psychologists'), orderByChild('rating'), limitToFirst(itemsPerPage));
//             break;
//         default:
//             psychologistsQuery = query(ref(db, 'psychologists'), orderByKey(), limitToFirst(itemsPerPage));
//     }
    
//     onValue(psychologistsQuery, (snapshot) => {
//         const data = snapshot.val();
//         if (data) {
//             let fetchedData = Object.entries(data).map(([key, value]) => ({ key, ...value }));

//             if (filter === 'nameDES' || filter === 'priceDES' || filter === 'ratingDES') {
//                 fetchedData = fetchedData.reverse();
//             }

//             setPsychologists(fetchedData);
//             setLastKey(fetchedData[fetchedData.length - 1].key);
//         } else {
//             setIsEnd(true);
//         }
//         setLoading(false);
//     });
// };
    
// export const loadMoreData = (lastKey, setLoading, setPsychologists, setLastKey, setIsEnd) => {
//     if (lastKey) {
//         setLoading(true);
//         const psychologistsQuery = query(
//             ref(db, 'psychologists'),
//             orderByKey(),
//             startAfter(lastKey),
//             limitToFirst(itemsPerPage)
//         );

//         onValue(psychologistsQuery, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 const fetchedData = Object.entries(data).map(([key, value]) => ({ key, ...value }));
//                 setPsychologists(prev => [...prev, ...fetchedData]);
//                 setLastKey(fetchedData[fetchedData.length - 1].key);
//             } else {
//                 setIsEnd(true);
//             }
//             setLoading(false);
//         });
//     }
// };
