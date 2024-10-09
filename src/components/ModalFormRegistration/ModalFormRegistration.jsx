/* eslint-disable no-useless-escape */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import Modal from 'react-modal';
import { IoMdClose } from 'react-icons/io';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

import css from './ModalFormRegistration.module.css';
import { useState } from 'react';


import { createAccount } from '../../utils/auth.js';


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
    name: yup.string().min(3).max(30).required(),
    email: yup.string().nullable().email().required(),
    password: yup.string().required('Please Enter your password').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    )
});

export default function ModalFormRegistration({ state, closeModal }) {
    const [type, setType] = useState('password');
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(logInSchema),
    });

    const onSubmit = (data) => {
        console.log(data)
        createAccount(data)
    };

    const handleToggle = () => {
        if (type==='password'){
            setPasswordIsVisible(!passwordIsVisible);
            setType('text')
        } else {
            setPasswordIsVisible(!passwordIsVisible);
            setType('password')
    };
}
    
    
    return (
        <Modal
            isOpen={state}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <button className={css.closeBtn} onClick={closeModal}>
                <IoMdClose style={{ color: '#191A15', width: '32px', height: '32px' }} />
            </button>
            <h3 className={css.titleModal} >Registration</h3>
            <p className={css.textModal} >
                Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('name')} placeholder='Name' className={css.field} />
                <p className={css.errText} >{errors.email?.message}</p>

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

                <button type='submit' className={css.btnSubmit} >Sign Up</button>
            </form>
        </Modal>
    );
}