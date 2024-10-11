import { useEffect, useState } from 'react';
import { PulseSpinner } from 'react-spinners-kit';
import Filters from '../../components/Filters/Filters.jsx';
import PsychologistsList from '../../components/PsychologistsList/PsychologistsList.jsx';
import { loadInitialData, loadMoreData } from '../../utils/psychologists.js';
import { monitorAuthState } from '../../utils/auth.js';
import { getFavoritesList, updateUserFavorites } from '../../utils/users.js';

import css from './PsychologistsPage.module.css';

export default function PsychologistsPage() {
    const [psychologists, setPsychologists] = useState([]); 
    const [isLogin, setIsLogin] = useState(false);
    const [userId, setUserId] = useState(null);
    const [favoritesList, setFavoritesList] = useState([]);
    const [lastKey, setLastKey] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        loadInitialData(setLoading, setPsychologists, setLastKey, setIsEnd);
        monitorAuthState(setIsLogin, setUserId);
    }, []);

    useEffect(() => {
        const fetchFavoritesList = async () => {
            if (userId) {
                const favoritesData = await getFavoritesList(userId);
                setFavoritesList(favoritesData);
            };
        };
        fetchFavoritesList();
    }, [userId]);

    const handleFavorite = (id) => {
       
        if (isLogin) {
            console.log(favoritesList);
            const newFavoritesList = favoritesList.includes(id) ? favoritesList.filter((el) => el !== id) : favoritesList.push(id);
            updateUserFavorites(userId, newFavoritesList);
            setFavoritesList(newFavoritesList);
        } else {
            console.log('You need to be authorized for using this option');
       }
    }

    return (
        <section className={css.container}>
            <Filters />
            {loading && (<div className={css.spinner}>
                <PulseSpinner size={60} color='#54be96'/>
            </div>)}
            {psychologists && <PsychologistsList psychologists={psychologists} favoritesList={favoritesList} onHandleFavorite={handleFavorite} />}
            {!isEnd && (
                <button type='button' className={css.loadMoreBtn} onClick={()=>loadMoreData(lastKey, setLoading, setPsychologists, setLastKey, setIsEnd)} disabled={loading} >{loading ? 'Loading ...' : 'Load more'}</button>
            )}
        </section>
    );
}