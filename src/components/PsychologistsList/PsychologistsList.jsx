import PsychologistItem from '../PsychologistItem/PsychologistItem';
import css from './PsychologistsList.module.css';

export default function PsychologistsList({psychologists}) {
    return (
        <ul className={css.list}>
            { psychologists.map((item) => (
                <li key={item.id}>
                    <PsychologistItem psychologist={item} />
                </li>
            ))}
        </ul>
    );
}