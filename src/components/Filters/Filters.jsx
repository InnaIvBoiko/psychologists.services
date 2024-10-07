import {
    IoIosArrowUp,
    // IoIosArrowDown
} from 'react-icons/io';

import css from './Filters.module.css';

export default function Filters() {

    return (
        <section className={css.filters}>
            <h5 className={css.title}>Filters</h5>
            <div className={css.toggler}>
                <p>A to Z</p> 
                <button type='button' className={css.arrowBtn}> 
                     <IoIosArrowUp style={{color: '#fbfbfb', width: '20px', height: '20px', strokeWidth: '2px' }}/> 
                    {/* :  */}
                    {/* <IoIosArrowDown style={{color: '#fbfbfb', width: '20px', height: '20px', strokeWidth: '2px' }} /> */}
                </button>
            </div>
        </section>
    )
}