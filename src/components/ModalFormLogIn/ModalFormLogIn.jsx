/* eslint-disable no-useless-escape */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import Modal from 'react-modal';
import { IoMdClose } from 'react-icons/io';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import css from './ModalFormLogIn.module.css';

Modal.setAppElement('#root');

const customStyles = {
    overlay: {
        background: 'rgba(25, 26, 21, 0.6)',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '30px',
        width: '565px',
        background: '#fbfbfb',
        padding: '64px',
        position: 'relative',
    },
};

const logInSchema = yup.object({
    email: yup.string().nullable().email().required(),
    password: yup.string().required('Please Enter your password').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
});

export default function ModalFormLogIn({ state, closeModal }) {
    const [type, setType] = useState('password');
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(logInSchema),
    });

    const onSubmit = (data) => console.log(data);


    const handleToggle = () => {
        if (type === 'password') {
            setPasswordIsVisible(!passwordIsVisible);
            setType('text')
        } else {
            setPasswordIsVisible(!passwordIsVisible);
            setType('password')
        };
    };
        
        return (
            <Modal
                isOpen={state}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <button className={css.closeBtn} onClick={closeModal}>
                    <IoMdClose style={{ color: '#191A15', width: '32px', height: '32px' }} />
                </button>
                <h3 className={css.titleModal} >Log In</h3>
                <p className={css.textModal} >Welcome back! Please enter your credentials to access your account and continue your search for a psychologist.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('email')} placeholder='Email' className={css.field} />
                    <p className={css.errText} >{errors.email?.message}</p>

                    <div className={css.passwordWrap}>
                        <input {...register('password')} placeholder='Password' className={css.field} type={ type } />
                        <button type='button' className={css.btnIsVisible} onClick={handleToggle}>
                            {passwordIsVisible ?
                                <IoEyeOutline style={{ color: '#191A15', width: '20px', height: '20px' }} />
                                :
                                <IoEyeOffOutline style={{ color: '#191A15', width: '20px', height: '20px' }} />
                            }
                        </button>
                        <p className={css.errText} >{errors.password?.message}</p>
                    </div>

                    <button type='submit' className={css.btnSubmit} >Log In</button>
                </form>
            </Modal>
        );
};