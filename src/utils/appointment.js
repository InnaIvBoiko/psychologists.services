import { push, ref, set } from 'firebase/database'; 
import { db } from './firebase.js';

export const createAppointment = ( newAppointment, dr_name) => {
    try {
        const userRef = ref(db, `appointments/${dr_name}`);
        const newAppointmentRef = push(userRef);
        return set(newAppointmentRef, newAppointment);  
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    };
};
