import Modal from 'react-modal';
import { IoMdClose } from 'react-icons/io';
import css from './ModalWindow.module.css';

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


export default function ModalWindow({ state,
    closeModal,
    title,
    text,
    message,
    children }) {
    return (
        <Modal
            isOpen={state}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <button className={css.closeBtn} onClick={closeModal}>
                <IoMdClose style={{ color: '#191A15', width: '32px', height: '32px' }} />
            </button>
            <h3 className={css.titleModal} > {title}</h3>
            <p className={css.textModal} > {text} </p>
            <p className={css.message}> {message} </p>
            
            {children}
        
        </Modal>
    );  
}