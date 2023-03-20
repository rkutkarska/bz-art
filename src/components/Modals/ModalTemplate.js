import React, { useState } from "react";
import styles from './ModalTemplate.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
// modal type, modal message

export const ModalTemplate = (props) => {
    let buttons;
    let modalCaption = '';
    const [isClosed, setIsOpen] = useState(true);

    const onClose = () => {
        if (isClosed) {
            setIsOpen(false);
            props.obj.setIsModalOpen(false);

        } else {
            setIsOpen(true);
        }
    }

    const onConfirm = (e) => {
        props.handleClick(true);
        onClose();
        return;
    }

    const onReject = (e) => {
        props.handleClick(false);
        onClose();
        return;
    }

    if (props.obj.modalObject.type === 'alert') {
        modalCaption = 'Предупреждение!'
        buttons = (<>
            <button onClick={onConfirm} className="button green">Да</button>
            <button onClick={onReject} className="button red">Не</button>
        </>);
    }

    if (props.obj.modalObject.type === 'error') {
        modalCaption = 'Грешка!'
        buttons = (
            <button onClick={onClose} className="button blue">OK</button>
        );
    }

    if (props.obj.modalObject.type === 'information') {
        modalCaption = 'Информация'

        buttons = (<>
            <button onClick={onClose} className="button blue">OK</button>
        </>);
    }

    if (props.obj.modalObject.type === 'confirm') {
        modalCaption = 'Моля, потвърдете...'
        buttons = (<>
            <button onClick={(e) => onConfirm(e)} className="button green">Да</button>
            <button onClick={(e) => onReject(e)} className="button red">Не</button>
        </>);
    }

    return (
        <>
            {
                isClosed
                    ? <>
                        <div className={styles["modal-background"]}></div>
                        <div className={styles["modal-container"]}>
                            <div className={styles.modal}>
                                <button
                                    onClick={onClose}
                                    className={`${styles.button} ${styles.close}`}>
                                    <FontAwesomeIcon icon={regular('circle-xmark')} className={styles.icon} />
                                </button>
                                <p className={styles[`modal__` + props.obj.modalObject.type]}>{modalCaption}</p>
                                <p className={styles["modal__message"]}>{props.obj.modalObject.message}</p>
                                <div className={styles["modal__buttons"]}>
                                    {buttons}
                                </div>
                            </div>
                        </div>
                    </>
                    : null
            }
        </>

    );
}