import css from './ButtonAuth.module.css';

export default function ButtonAuth({ text }) {
    return (
        <button type='button' className={css.btn}>{ text }</button>
    )
}