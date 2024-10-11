import { db } from './firebase.js';
import { ref, onValue, get, query, limitToFirst, orderByKey, startAfter } from 'firebase/database';

const itemsPerPage = 3; 

export const loadInitialData = (setLoading, setPsychologists, setLastKey, setIsEnd) => {
        setLoading(true);
        const psychologistsQuery = query(ref(db, 'psychologists'), orderByKey(), limitToFirst(itemsPerPage));
        
    onValue(psychologistsQuery, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const fetchedData = Object.entries(data).map(([key, value]) => ({ key, ...value }));
            setPsychologists(fetchedData);
            setLastKey(fetchedData[fetchedData.length - 1].key);
        } else {
            setIsEnd(true);
        }
        setLoading(false);
    });
};
    
export const loadMoreData = (lastKey, setLoading, setPsychologists, setLastKey, setIsEnd) => {
    if (lastKey) {
        setLoading(true);
        const psychologistsQuery = query(
            ref(db, 'psychologists'),
            orderByKey(),
            startAfter(lastKey),
            limitToFirst(itemsPerPage)
        );

        onValue(psychologistsQuery, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const fetchedData = Object.entries(data).map(([key, value]) => ({ key, ...value }));
                setPsychologists(prev => [...prev, ...fetchedData]);
                setLastKey(fetchedData[fetchedData.length - 1].key);
            } else {
                setIsEnd(true);
            }
            setLoading(false);
        });
    }
};

export const getPsychologistById = async (id) => {
    const psychologistRef = ref(db, `psychologists/${id}`);
    
    try {
        const snapshot = await get(psychologistRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log('No data available');
            return null; 
        }
    } catch (error) {
        console.error('Error fetching psychologist data:', error);
        return null;
    }
};