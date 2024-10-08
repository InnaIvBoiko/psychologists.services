import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import clsx from 'clsx';
import Logo from '../Logo/Logo.jsx';
import ButtonAuth from '../ButtonAuth/ButtonAuth.jsx';
import ModalFormLogIn from '../ModalFormLogIn/ModalFormLogIn.jsx';
import ModalFormRegistration from '../ModalFormRegistration/ModalFormRegistration.jsx';
import css from './Navigation.module.css';


const getNavLinkClass = ({ isActive }) => {
  return clsx(css.navMenuItem, isActive && css.active);
};

export default function Navigation() {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [registrationIsOpen, setRegistrationIsOpen] = useState(false);
        
    return (
        <header className={css.mainHeader}>
            <nav className={css.navWrap}>
                <Link to='/'>
                    <Logo />
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
                <ButtonAuth text='Log In' onModalLogIn={() => setModalIsOpen(true)} />
                <button type='button' className={css.registrationBtn} onClick={() => setRegistrationIsOpen(true)} >Registration</button>
            </div>
            <ModalFormLogIn state={modalIsOpen} closeModal={() => setModalIsOpen(false)} />
            <ModalFormRegistration state={registrationIsOpen} closeModal={() => setRegistrationIsOpen(false)} />
        </header>
    );
}