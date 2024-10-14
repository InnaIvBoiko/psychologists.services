import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PulseSpinner } from 'react-spinners-kit';
import Filters from '../../components/Filters/Filters.jsx';
import PsychologistsList from '../../components/PsychologistsList/PsychologistsList.jsx';
import { monitorAuthState } from '../../utils/auth.js';
import { getFavoritesList, updateUserFavorites } from '../../utils/users.js';
import css from './FavoritesPage.module.css';


export default function FavoritesPage() {
    const [isLogin, setIsLogin] = useState(false);
    const [userId, setUserId] = useState(null);
    const [favoritesList, setFavoritesList] = useState([]);
    const [favoritesListId, setFavoritesListId] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all');
    const [visibleItem, setVisibleItem] = useState(3);

    useEffect(() => {
        monitorAuthState(setIsLogin, setUserId);
    }, []);

    useEffect(() => {
        setLoading(true);
        const fetchFavoritesList = async () => {
            if (userId) {
                const favoritesData = await getFavoritesList(userId);
                setFavoritesList(Object.values(favoritesData) || []);
                const idList = favoritesData.map((item) => item.id);
                setFavoritesListId(idList);
            };
        };
        fetchFavoritesList();
        setLoading(false);
    }, [userId]);

    const handleFavorite = (item) => {
        if (isLogin) {
            let newFavoritesList = [];
            if (favoritesList.includes(item)) {
                newFavoritesList = favoritesList.filter((el) => el !== item);
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

    const sortedFavorites = [...favoritesList].sort((a, b) => {
        switch (filter) {
            case 'nameASC':
                return a.name.localeCompare(b.name); 
            case 'nameDES':
                return b.name.localeCompare(a.name); 
            case 'priceASC':
                return a.price_per_hour - b.price_per_hour; 
            case 'priceDES':
                return b.price_per_hour - a.price_per_hour; 
            case 'ratingASC':
                return a.rating - b.rating; 
            case 'ratingDES':
                return b.rating - a.rating;
            default:
                return 0; 
        }
    });

    const visibleFavorites = sortedFavorites.slice(0, visibleItem);

    return (
        <section className={css.container}>
            {loading && (
                <div className={css.spinner}>
                    <PulseSpinner size={60} color='#54be96' />
                </div>
            )}
            {favoritesList.length > 0 ?
                (<Filters value={filter} onSelect={setFilter} />) :
                (<div className={css.wrap}>
                    <h3>
                        There is no data here yet, please select your favorite psychologists from the list...
                    </h3>
                    <NavLink to={'/psychologists'} className={css.link}>
                        Psychologists
                    </NavLink></div>
                )
            }
            {visibleFavorites &&
                (<PsychologistsList
                    list={visibleFavorites}
                    favoritesList={favoritesListId}
                    onHandleFavorite={handleFavorite} />)}
            {visibleItem < sortedFavorites.length && (
                <button
                    type='button'
                    className={css.loadMoreBtn}
                    onClick={() => { setVisibleItem(prevItem => prevItem + 3) }}
                    disabled={loading} >
                    {loading ? 'Loading ...' : 'Load more'}
                </button>)}
        </section>
    );
}