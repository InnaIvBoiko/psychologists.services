/* eslint-disable no-useless-escape */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import css from './ModalFormLogIn.module.css';

import { loginEmailPassword } from '../../utils/auth.js';





const logInSchema = yup.object({
    email: yup.string().nullable().email().required(),
    password: yup.string().required('Please Enter your password').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
});

export default function ModalFormLogIn({onLogin, onIsLogin}) {
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
        loginEmailPassword(data);
        onLogin(false);
        onIsLogin(true);
    };


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
        );
};