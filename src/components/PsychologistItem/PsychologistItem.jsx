import { GoStarFill } from 'react-icons/go';
import {
    FaRegHeart,
    // FaHeart
 } from 'react-icons/fa6';
import css from './PsychologistItem.module.css';


export default function PsychologistItem({ psychologist: {
    avatar_url,
    name,
    rating,
    price_per_hour,
    experience,
    license,
    specialization,
    initial_consultation,
    about
} }) {

    return (
        <div className={css.card}>
            <div className={css.imgWrap}>
                <img src={avatar_url} alt={name} className={css.photo} />
            </div>
            <div className={css.infoWrap}>
                <div className={css.row}>
                    <h2 className={css.name}><span className={css.title}>Psychologist</span>{name}</h2>
                    <div className={css.info}>
                        <h4 className={css.rating}>
                            <span className={css.iconWrap}>
                                <GoStarFill style={{ color: '#FFC531', width: '16px', height: '16px' }} />
                            </span>
                            Rating: {rating}
                        </h4>
                        <h3 className={css.price}>Price / 1 hour: <span className={css.accent}>{price_per_hour}$</span> </h3>
                        <FaRegHeart style={{ color: '#191A15', width: '26px', height: '26px', strokeWidth: '2px' }} />
                        {/* <FaHeart style={{color: '#54BE96', width: '26px', height: '26px'}} /> */}
                    </div>
                </div>
                <ul className={css.experienceList}>
                    <li className={css.experienceItem}><h3 className={css.data}><span className={css.title}>Experience:</span> { experience }</h3></li>
                    <li className={css.experienceItem}><h3 className={css.data}><span className={css.title}>License:</span> { license }</h3></li>
                    <li className={css.experienceItem}><h3 className={css.data}><span className={css.title}>Specialization: </span> { specialization }</h3></li>
                    <li className={css.experienceItem}><h3 className={css.data}><span className={css.title}>Initial_consultation:</span> { initial_consultation } </h3></li>
                </ul>
                <p className={css.about}>{ about }</p>
            </div>
        </div>
    )
}