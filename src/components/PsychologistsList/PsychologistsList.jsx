import PsychologistItem from '../PsychologistItem/PsychologistItem';
import css from './PsychologistsList.module.css';

export default function PsychologistsList({
    list,
    favoritesList,
    onHandleFavorite }) {
    return (
        <ul className={css.list}>
            { list.map((item) => (
                <li key={item.key}>
                    <PsychologistItem
                        list={item}
                        favoritesList={favoritesList}
                        onHandleFavorite={onHandleFavorite} />
                </li>
            ))}
        </ul>
    );
}