import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import Logo from '../Logo/Logo.jsx';
import ButtonAuth from '../ButtonAuth/ButtonAuth.jsx';
import css from './Navigation.module.css';

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.navMenuItem, isActive && css.active);
};

export default function Navigation() {
    return (
        <header className={css.mainHeader}>
            <nav className={css.navWrap}>
                <Link to='/'>
                    <Logo/>
                </Link>     
                <ul className={css.navMenu}>
                    <li>
                        <NavLink to={'/'} className={getNavLinkClass}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/psychologists'} className={getNavLinkClass}>
                            Psychologists
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to={'/favorites'} className={getNavLinkClass}>
                            Favorites
                        </NavLink>
                    </li> */}
                </ul>
            </nav>
            <div className={css.auth}>
                <ButtonAuth text='Log In' />
                <button type='button' className={css.registrationBtn} >Registration</button>
            </div>
        </header>
    )
}