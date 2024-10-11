import { useEffect, useState } from 'react';
import { PulseSpinner } from 'react-spinners-kit';
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


    return (
        <section className={css.container}>
            {loading && (<div className={css.spinner}>
                <PulseSpinner size={60} color='#54be96' />
            </div>)}
            {favoritesList && <PsychologistsList
                list={favoritesList}
                favoritesList={favoritesListId}
                onHandleFavorite={handleFavorite} />}
        </section>
    );
}