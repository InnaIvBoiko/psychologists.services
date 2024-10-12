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
    const [favoritesListId, setFavoritesListId] = useState([]);
    const [lastKey, setLastKey] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    const [filter, setFilter] = useState('nameASC');

    useEffect(() => {
        loadInitialData(setLoading, setPsychologists, setLastKey, setIsEnd, filter);
        monitorAuthState(setIsLogin, setUserId);
    }, [filter]);

    useEffect(() => {
        const fetchFavoritesList = async () => {
            if (userId) {
                const favoritesData = await getFavoritesList(userId);
                setFavoritesList(favoritesData || []);
                const idList = favoritesData.map((item) => item.id);
                setFavoritesListId(idList);
            };
        };
        fetchFavoritesList();
    }, [userId]);

    const handleFavorite = (item) => {
        if (isLogin) {
            let newFavoritesList = [];
            if (favoritesList.includes(item.id)) {
                newFavoritesList = favoritesList.filter((el) => el !== item.id);
            } else {
                newFavoritesList = [...favoritesList, item];
            }
            updateUserFavorites(userId, newFavoritesList);
            setFavoritesList(newFavoritesList);
            setFavoritesListId(newFavoritesList.map((el) => el.id));
        } else {
            console.log('You need to be authorized for using this option');
        };
    };

    return (
        <section className={css.container}>
            <Filters value={filter} onSelect={setFilter}/>
            {loading && (<div className={css.spinner}>
                <PulseSpinner size={60} color='#54be96'/>
            </div>)}
            {psychologists && <PsychologistsList
                list={psychologists}
                favoritesList={favoritesListId}
                onHandleFavorite={handleFavorite} />}
            {!isEnd && (
                <button
                    type='button'
                    className={css.loadMoreBtn}
                    onClick={() => loadMoreData(lastKey, setLoading, setPsychologists, setLastKey, setIsEnd)}
                    disabled={loading} >
                    {loading ? 'Loading ...' : 'Load more'}
                </button>
            )}
        </section>
    );
}