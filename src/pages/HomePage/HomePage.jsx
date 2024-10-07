import { NavLink } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { FaQuestion } from 'react-icons/fa6';
import { HiUsers } from 'react-icons/hi';
import Arrow from '../../components/icons/Arrow';
import css from './HomePage.module.css';

export default function HomePage() {
    return (
        <section className={css.main}>
            <div className={css.info}>
                <h1 className={css.title}>
                    The road to the <span className={css.accent}>depths</span> of the human soul
                </h1>
                <p className={css.text}>
                    We help you to reveal your potential, overcome challenges and find a guide in your own life with the help of our experienced psychologists.
                </p>
                <NavLink to={'/psychologists'} className={css.link}> 
                    Get started
                    <Arrow />
                </NavLink>
            </div>
            <div className={css.photo}>
                <div className={css.block}>
                    <span className={css.icon}>
                        <FaCheck style={{color: '#54BE96', width: '20px', height: '16px' }}/>
                    </span>
                    <div>
                        <p className={css.blockText}>
                            Experienced psychologists
                        </p>
                        <h3 className={css.number}>
                            15,000
                        </h3>
                    </div>
                </div>
                <span className={css.blue}>
                    <FaQuestion style={{color: '#FBFBFB', width: '10px', height: '17px', transform: 'rotate(15deg)'}} />
                </span>
                <span className={css.orange}>
                    <HiUsers style={{color: '#FBFBFB', width: '25px', height: '25px'}}/>
                </span>
                <span className={css.blur}></span>
            </div>
        </section>
    )
}