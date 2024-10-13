import { useState } from 'react';
import { GoStarFill } from 'react-icons/go';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import ModalWindow from '../ModalWindow/ModalWindow';
import ModalFormAppointment from '../ModalFormAppointment/ModalFormAppointment';
import 'react-toastify/dist/ReactToastify.css';
import css from './MoreInfo.module.css';

export default function MoreInfo({ list: {
    reviews, 
    name,
    avatar_url

} }) {
    const [appointmentIsOpen, setAppointmentIsOpen] = useState(false);
    const notify = () => toast.success('Your application has been successfully sent. You will be contacted soon!');

    return (
        <div className={css.wrap}>
            <ul className={css.list}>
                {reviews.map((item) => (
                    <li key={item.key}>
                        <div className={css.row}> 
                            <span className={css.char}>{item.reviewer.charAt(0)}</span>
                            <div>
                                <h3 className={css.name} >{item.reviewer}</h3>
                                <h4 className={css.rating}>
                                    <span className={css.iconWrap}>
                                        <GoStarFill style={{ color: '#FFC531', width: '16px', height: '16px' }} />
                                    </span>
                                    {item.rating}
                                </h4>
                            </div>
                        </div>
                        <p className={css.comment}>{item.comment}</p>
                    </li>
                ))}
            </ul>
            <button type='button' className={css.appointmentBtn} onClick={() => setAppointmentIsOpen(true)}>Make an appointment</button>
            <ModalWindow
                state={appointmentIsOpen}
                closeModal={() => setAppointmentIsOpen(false)}
                title='Make an appointment with a psychologists'
                text='You are on the verge of changing your life for the better. Fill out the short form below to book your personal appointment with a professional psychologist. We guarantee confidentiality and respect for your privacy.'
            >
                <ModalFormAppointment onAppointment={setAppointmentIsOpen} name={name} avatar={avatar_url} onNotify={ notify} />
            </ModalWindow>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
                transition={Bounce}
            />
        </div>
    );
}