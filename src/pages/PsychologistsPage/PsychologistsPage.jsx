import { useEffect, useState } from 'react';
import { PulseSpinner } from 'react-spinners-kit';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Filters from '../../components/Filters/Filters.jsx';
import PsychologistsList from '../../components/PsychologistsList/PsychologistsList.jsx';
import { getInitialData } from '../../utils/psychologists.js';
import { monitorAuthState } from '../../utils/auth.js';
import { getFavoritesList, updateUserFavorites } from '../../utils/users.js';
import 'react-toastify/dist/ReactToastify.css';
import css from './PsychologistsPage.module.css';

export default function PsychologistsPage() {
    const [psychologists, setPsychologists] = useState([]); 
    const [isLogin, setIsLogin] = useState(false);
    const [userId, setUserId] = useState(null);
    const [favoritesList, setFavoritesList] = useState([]);
    const [favoritesListId, setFavoritesListId] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all');
    const [visibleItem, setVisibleItem] = useState(3);

    const notify = () => toast.warning('You need to be authorized for using this option');

    useEffect(() => {
        setLoading(true);
        const fetchPsychologistsList = async () => {
                const psychologistsData = await getInitialData();
                setPsychologists(Object.values(psychologistsData) || []);
        };
        fetchPsychologistsList();
        monitorAuthState(setIsLogin, setUserId);
        setLoading(false);
    }, []);

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
            notify();
        };
    };

    const sortedPsychologists = [...psychologists].sort((a, b) => {
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
        };
    });

    const visiblePsychologists = sortedPsychologists.slice(0, visibleItem);

    return (
        <section className={css.container}>
            <Filters value={filter} onSelect={setFilter}/>
            {loading && (<div className={css.spinner}>
                <PulseSpinner size={60} color='#54be96'/>
            </div>)}
            {psychologists && <PsychologistsList
                list={visiblePsychologists}
                favoritesList={favoritesListId}
                onHandleFavorite={handleFavorite} />}
            {visibleItem < sortedPsychologists.length && (
                <button
                    type='button'
                    className={css.loadMoreBtn}
                    onClick={() => { setVisibleItem(prevItem => prevItem + 3) }}
                    disabled={loading} >
                    {loading ? 'Loading ...' : 'Load more'}
                </button>)}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
                transition={Bounce}
            />
        </section>
    );
}