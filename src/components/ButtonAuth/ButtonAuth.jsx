import css from './ButtonAuth.module.css';

export default function ButtonAuth({ text, onModalLogIn }) {
    return (
        <button type='button' className={css.btn} onClick={onModalLogIn}>{ text }</button>
    )
}