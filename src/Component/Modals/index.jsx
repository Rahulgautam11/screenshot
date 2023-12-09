import React, { useEffect, useImperativeHandle, useState, forwardRef, useCallback } from 'react'
import { createPortal } from 'react-dom';
import './style.scss';

export function Modals({ children, fade = true, defaultOpened = false, ModalsSize, slide, Position, ClosePopUp }, ref) {
    const modalElement = document.getElementById('root')
    const [isOpen, setIsOpen] = useState(defaultOpened)

    const close = useCallback(() => {
        setIsOpen(false)
    }, [])
    const closePopupModal = () => {
        ClosePopUp()
        close()
    }

    useImperativeHandle(ref, () => ({
        isOpen: isOpen,
        open: () => setIsOpen(true),
        close
    }), [close, isOpen])

    const handleEscape = useCallback(event => {
        if (event.keyCode === 27) close()
        // console.log(event.keyCode, "event.keyCode")
    }, [close])


    const manageBrowserBtn = () => {

        if (ref?.current?.isOpen) {
            window.history.pushState(null, null, window.location.href);
        }
    }
    useEffect(() => {
        if (isOpen) document.addEventListener('keydown', handleEscape, false)
        manageBrowserBtn()
        return () => {
            document.removeEventListener('keydown', handleEscape, false)
        }
    }, [handleEscape, isOpen])

    return createPortal(
        isOpen ? (
            <div className={`ModalsContainer ${fade ? 'modals-fade' : ''} ${Position}`}>
                <div className="ModalsOverlay" onClick={closePopupModal} />
                <div className={`ModalsWrapper ${ModalsSize} ${fade ? `slide-${slide ? slide : 'left'}` : ""}`}>
                    <div className="ModalsClose" role="button" aria-label="close" onClick={closePopupModal}>
                        <i className="modals-cancel-icon"></i>
                    </div>

                    {children}
                </div>
            </div>
        ) : null,
        modalElement
    )
}

export default forwardRef(Modals)