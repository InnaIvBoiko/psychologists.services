import { useEffect, useState } from 'react';
import Filters from '../../components/Filters/Filters.jsx';
import PsychologistsList from '../../components/PsychologistsList/PsychologistsList.jsx';
import { db } from "../../utils/firebase";
import { off, onValue, ref } from "firebase/database";
import css from './PsychologistsPage.module.css';

export default function PsychologistsPage() {
    const [psychologists, setPsychologists] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const query = ref(db, 'psychologists');
        onValue(query, (snapshot) => {
            const fetchedData = snapshot.val();
            setPsychologists(fetchedData);
            setLoading(false); 
        });
        return () => off(query); 
    }, []);

    return (
        <section className={css.container}>
            {loading && <div>Loading...</div>}
            <Filters />
            {psychologists && <PsychologistsList psychologists={psychologists} />}
        </section>
    );
}