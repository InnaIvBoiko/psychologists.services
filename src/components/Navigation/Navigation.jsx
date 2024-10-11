import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa6';
import clsx from 'clsx';
import Logo from '../Logo/Logo.jsx';
import ButtonAuth from '../ButtonAuth/ButtonAuth.jsx';
import ModalFormLogIn from '../ModalFormLogIn/ModalFormLogIn.jsx';
import ModalFormRegistration from '../ModalFormRegistration/ModalFormRegistration.jsx';
import ModalWindow from '../ModalWindow/ModalWindow.jsx';
import { logout, monitorAuthState } from '../../utils/auth.js';
import { getUsername } from '../../utils/users.js';
import css from './Navigation.module.css';


const getNavLinkClass = ({ isActive }) => {
  return clsx(css.navMenuItem, isActive && css.active);
};

export default function Navigation() {
    const [isLogin, setIsLogin] = useState(false);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [loginIsOpen, setLoginIsOpen] = useState(false);
    const [registrationIsOpen, setRegistrationIsOpen] = useState(false);
   
    useEffect(() => {
        monitorAuthState(setIsLogin, setUserId);
    }, []);
    
    useEffect(() => {
        const fetchUsername = async () => {
            if (userId) {
                const name = await getUsername(userId);
                setUsername(name);
            };
        };
        fetchUsername();
    }, [userId]);
    
    const handleLogout = () => {
        logout();
        setIsLogin(false);
    };

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
                    {isLogin && (<li>
                        <NavLink to={'/favorites'} className={getNavLinkClass}>
                            Favorites
                        </NavLink>
                    </li>)}
                </ul>
            </nav>
            <div className={css.auth}>
                {isLogin && 
                    (<div className={css.userInfo}>
                        <span className={css.userIcon}>
                            <FaUser style={{color: '#FBFBFB', width: '24px', height: '24px'}} />
                        </span>
                    {username && <p className={css.username}>{username}</p>}
                    </div>)}
                {!isLogin ? 
                    (<ButtonAuth text='Log In' onModalLogIn={() => setLoginIsOpen(true)} />) : 
                    (<NavLink to={'/'} >
                        <ButtonAuth text='Log out' onModalLogIn={handleLogout}/>
                    </NavLink>)
                }
                {!isLogin && (<button type='button' className={css.registrationBtn} onClick={() => setRegistrationIsOpen(true)} >Registration</button>)}
            </div>
            <ModalWindow 
                state={loginIsOpen}
                closeModal={() => setLoginIsOpen(false)} 
                title='Log In'
                text='Welcome back! Please enter your credentials to access your account and continue your search for a psychologist.'>
                <ModalFormLogIn onLogin={setLoginIsOpen} onIsLogin={ setIsLogin } />
            </ModalWindow>
            <ModalWindow
                state={registrationIsOpen}
                closeModal={() => setRegistrationIsOpen(false)}
                title='Registration'
                text='Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.'
            >
                <ModalFormRegistration onRegistration={ setRegistrationIsOpen } onIsLogin={setIsLogin} />
            </ModalWindow>
        </header>
    );
}