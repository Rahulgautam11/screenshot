import React from 'react'
import './style.scss'
import Modals from '../Modals';
import ModalBody from '../Modals/ModalBody';

const PopUp = ({ openpopup, onclose, img, handleSave }) => {

    const closeModal = () => {
        onclose();
    }
    return (
        <Modals ref={openpopup} Position="center" ClosePopUp={() => closeModal()} >
            <ModalBody className={'modal_pop_body'}>
                <figure>
                    <img src={img} alt="img" />
                </figure>
                {img && <button onClick={handleSave}>Download</button>}
            </ModalBody>
        </Modals>
    )
}

export default PopUp