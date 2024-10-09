import { useEffect, useState } from 'react';
import { PulseSpinner } from 'react-spinners-kit';
import Filters from '../../components/Filters/Filters.jsx';
import PsychologistsList from '../../components/PsychologistsList/PsychologistsList.jsx';
import { db } from "../../utils/firebase";
import { ref, onValue, query, limitToFirst, orderByKey, startAfter } from "firebase/database";
import css from './PsychologistsPage.module.css';

export default function PsychologistsPage() {
    const [psychologists, setPsychologists] = useState([]); 
    const [lastKey, setLastKey] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isEnd, setIsEnd] = useState(false);

    const itemsPerPage = 3; 

    const loadInitialData = () => {
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

    const loadMoreData = () => {
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

    useEffect(() => {
        loadInitialData();
    }, []);

    return (
        <section className={css.container}>
            <Filters />
            {loading && (<div className={css.spinner}>
                <PulseSpinner size={60} color='#54be96'/>
            </div>)}
            {psychologists && <PsychologistsList psychologists={psychologists} />}
            {!isEnd && (
                <button type='button' className={css.loadMoreBtn} onClick={loadMoreData}>Load more</button>
            )}
        </section>
    );
}