
import Filters from '../../components/Filters/Filters.jsx';
import PsychologistsList from '../../components/PsychologistsList/PsychologistsList.jsx';
import css from './PsychologistsPage.module.css';

import psychologists from '../../psychologists.json';

export default function PsychologistsPage() {
    return (
        <section className={css.container}>
            <Filters />
            <PsychologistsList psychologists={psychologists} />
        </section>
    )
}