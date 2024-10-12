import { useId, useState } from 'react';
import {
    IoIosArrowUp,
    IoIosArrowDown
} from 'react-icons/io';

import css from './Filters.module.css';


export default function Filters({ value, onSelect }) {
    const filterId = useId();
    const [isActive, setIsActive] = useState(false);

    const handleSelect = (e) => {
        setIsActive(true);
        onSelect(e.target.value);
        setIsActive(false);
    }

    return (
        <section className={css.filters}>
            <label htmlFor={filterId} className={css.title}>Filters</label>
            <select
                className={css.toggler}
                name='filter'
                id={filterId}
                value={value}
                onChange={handleSelect}
            >
                <option value='nameASC'>A to Z</option>
                <option value='nameDES'>Z to A</option>
                <option value='priceASC'>Less than 10$</option>
                <option value='priceDES'>Greater than 10$</option>
                <option value='ratingDES'>Popular</option>
                <option value='ratingASC'>Not popular</option>
                <option value='all'>Show all</option>
            </select>
            <button type='button' className={css.arrowBtn}>
                {isActive ?
                    <IoIosArrowUp style={{ color: '#fbfbfb', width: '20px', height: '20px', strokeWidth: '2px' }} /> :
                    <IoIosArrowDown style={{ color: '#fbfbfb', width: '20px', height: '20px', strokeWidth: '2px' }} />}
            </button>
        </section>
    );
}