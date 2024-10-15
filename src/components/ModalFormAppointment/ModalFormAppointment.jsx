import { useForm } from 'react-hook-form';
import { GoClock } from 'react-icons/go';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createAppointment } from '../../utils/appointment';
import css from './ModalFormAppointment.module.css';

const phoneRegExp = /^\+\d{2}\d{3}\d{3}\d{4}$/;

const appointmentSchema = yup.object({
    username: yup.string().min(3).max(30).required(),
    phone: yup.string()
        .matches(phoneRegExp, 'Phone number should be "+xxxxxxxxxxxx"')
        .required('This field is required!'),
    meetingTime: yup.string().required('Time is required'),
    email: yup.string().nullable().email().required(),
    comment: yup.string().required()
});

export default function ModalFormAppointment({ onAppointment, dr_name, avatar, onNotify }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(appointmentSchema),
    });

    const onSubmit = (data) => {
        onNotify();
        createAppointment(data, dr_name)
        onAppointment(false);
    };

    return (
        <>
            <div className={css.psychologists}>
                <img src={avatar} alt={dr_name} className={css.avatarImg} />
                <h3 className={css.name} >
                    <span className={css.text}>Your psychologists</span>
                    Dr. {dr_name}</h3>

            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={css.form} >
                <input {...register('username')} placeholder='Name' className={css.field} />
                <p className={css.errText} >{errors.name?.message}</p>

                <input {...register('phone')} placeholder='+380' className={css.halfField} />
                <p className={css.errText} >{errors.phone?.message}</p>
                
                <div className={css.timeWrap}>
                    <select
                        className={css.halfFieldTime}
                        {...register('meetingTime')}
                    >
                        <option value='09:00'>09:00</option>
                        <option value='09:30'>09:30</option>
                        <option value='10:00'>10:00</option>
                        <option value='10:30'>10:30</option>
                    </select>
                    <span className={css.clock}>
                        <GoClock style={{ color: '#191A15', width: '20px', height: '20px' }} />
                    </span>
                </div>
                <p className={css.errText} >{errors.meetingTime?.message}</p>

                <input {...register('email')} placeholder='Email' className={css.field} />
                <p className={css.errText} >{errors.email?.message}</p>

                <textarea {...register('comment')} placeholder='Comment' className={css.comment} />
                <p className={css.errText} >{errors.comment?.message}</p>

                <button type='submit' className={css.appointmentBtn} >
                    Send
                </button>
            </form>
        </>
    );
}