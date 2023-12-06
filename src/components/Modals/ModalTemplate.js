import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useModal } from '../../context/ModalContext';
import styles from './ModalTemplate.module.css';
// modal type, modal message

export const ModalTemplate = (props) => {
    const { closeModal, onConfirm, onReject, isOpen } = useModal();

    let buttons;
    let modalCaption = '';

    if (props.obj.modalObject.type === 'alert') {
        modalCaption = 'Внимание!';
        buttons = (<>
            <button onClick={closeModal} className="button red">ОК</button>
        </>);
    }

    if (props.obj.modalObject.type === 'error') {
        modalCaption = 'Грешка!';
        buttons = (
            <button onClick={closeModal} className="button blue">OK</button>
        );
    }

    if (props.obj.modalObject.type === 'information') {
        modalCaption = 'Информация';

        buttons = (<button onClick={closeModal} className="button blue">OK</button>);
    }

    if (props.obj.modalObject.type === 'confirm') {
        modalCaption = 'Моля, потвърдете...';
        buttons = (<>
            <button onClick={(e) => onConfirm(e)} className="button green">Да</button>
            <button onClick={(e) => onReject(e)} className="button red">Не</button>
        </>);
    }

    if (props.obj.modalObject.type === 'cart') {
        modalCaption = 'Информация!';
        buttons = (<>
            <Link to="/shopping-cart" className="button blue">Към количката</Link>
            <button onClick={closeModal} className="button green">ОК</button>
        </>);
    }

    if (props.obj.modalObject.type === 'favourites') {
        modalCaption = 'Информация!';
        buttons = (<>
            <Link to="/favourites" className="button blue">Към любими</Link>
            <button onClick={closeModal} className="button green">ОК</button>
        </>);
    }

    return (
        <>
            {
                isOpen
                    ? <>
                        <div className={styles["modal-background"]}></div>
                        <div className={styles["modal-container"]}>
                            <div className={styles.modal}>
                                <button
                                    onClick={closeModal}
                                    className={`${styles.button} ${styles.close}`}>
                                    <FontAwesomeIcon icon={regular("circle-xmark")} className={styles.icon} />
                                </button>
                                <p className={styles["modal__" + props.obj.modalObject.type]}>{modalCaption}</p>
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