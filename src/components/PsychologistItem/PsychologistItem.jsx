import { GoStarFill } from 'react-icons/go';
import {
    FaRegHeart,
    FaHeart
 } from 'react-icons/fa6';
import css from './PsychologistItem.module.css';


export default function PsychologistItem({
    list,
    favoritesList,
    onHandleFavorite
}) {
    const isFavorite = favoritesList.includes(list.id);

    return (
        <div className={css.card}>
            <div className={css.imgWrap}>
                <img src={list.avatar_url} alt={list.name} className={css.photo} />
            </div>
            <div className={css.infoWrap}>
                <div className={css.row}>
                    <h2 className={css.name}><span className={css.title}>Psychologist</span>{list.name}</h2>
                    <div className={css.info}>
                        <h4 className={css.rating}>
                            <span className={css.iconWrap}>
                                <GoStarFill style={{ color: '#FFC531', width: '16px', height: '16px' }} />
                            </span>
                            Rating: {list.rating}
                        </h4>
                        <h3 className={css.price}>Price / 1 hour: <span className={css.accent}>{list.price_per_hour}$</span> </h3>
                        <button type='button' className={css.favoriteBtn} onClick={() => onHandleFavorite(list) }>
                            {isFavorite ?
                                <FaHeart style={{ color: '#54BE96', width: '26px', height: '26px' }} /> :
                                <FaRegHeart style={{ color: '#191A15', width: '26px', height: '26px' }} />
                            }                            
                        </button>
                    </div>
                </div>
                <ul className={css.experienceList}>
                    <li className={css.experienceItem}><h3 className={css.data}><span className={css.title}>Experience:</span> { list.experience }</h3></li>
                    <li className={css.experienceItem}><h3 className={css.data}><span className={css.title}>License:</span> { list.license }</h3></li>
                    <li className={css.experienceItem}><h3 className={css.data}><span className={css.title}>Specialization: </span> { list.specialization }</h3></li>
                    <li className={css.experienceItem}><h3 className={css.data}><span className={css.title}>Initial_consultation:</span> { list.initial_consultation } </h3></li>
                </ul>list
                <p className={css.about}>{ list.about }</p>
            </div>
        </div>
    )
}