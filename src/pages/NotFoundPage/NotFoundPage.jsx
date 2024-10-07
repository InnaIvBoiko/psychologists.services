import { Link } from 'react-router-dom';
import { MdOutlinePsychology } from 'react-icons/md';
import Logo from '../../components/Logo/Logo';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
    return (
        <section className={css.container}>
             <MdOutlinePsychology style = {{ color: '#54be96', width: '48px', height: '48px'  }} />
            <p>Opps! Page not found! Sorry!</p>
            <p>
                Please visit out
            </p>
            <Link to='/'>
                <Logo />
            </Link>
        </section>
    );
}