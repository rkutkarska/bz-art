import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { ModalTemplate } from "../Modals/ModalTemplate";
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

import styles from './AdminPanel.module.css';
import * as adminService from "../../services/adminService";

export const ListMaterials = ({ documents }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalObject, setModalObject] = useState({});
    const [currentDocumentId, setCurrentDocumentId] = useState('');

    documents.isClicked.current = !documents.isClicked.current;

    const handleClick = (isConfirmed) => {
        if (isConfirmed) {
            adminService.deleteMaterial(
                currentDocumentId,
                documents.documents,
                documents.setDocuments,
                documents.isClicked,
                setIsModalOpen,
                setModalObject
            );
        }
        return;
    }
    return (
        <>
            {isModalOpen ? <ModalTemplate obj={{ modalObject, setIsModalOpen }} handleClick={handleClick} /> : false}

            {
                documents.documents.length > 0
                    ? <>
                        <h2>Списък с наличните материали</h2>
                        <div className={`${styles.table__header} ${styles.table__row}`}>
                            <div></div>
                            <div>Име</div>
                            <div>Създаден на</div>
                            <div>Действия</div>
                        </div>
                    </>
                    : <h2 className={styles["no-items"]}>Няма добавени материали!</h2>
            }

            {
                documents.documents.map((document, index) => (
                    <div key={document.id} className={styles.table__row}>
                        <div>{index + 1}</div>
                        <div>{document.materialName}</div>

                        <div>{document.dateCreated.toDate().toLocaleString("bg-BG", { dateStyle: 'long', timeStyle: "short" })}</div>
                        <div className={styles.row__actions}>
                            <Link to={`/admin-panel/read-material/${document.id}`} className="button green">
                                <FontAwesomeIcon icon={regular('eye')} className={`${styles.view} ${"fa-icon"}`} />
                                Прегледай
                            </Link>
                            {
                                documents.currentUserRole == 1 &&
                                <>
                                    <Link to={`/admin-panel/update-material/${document.id}`} className="button orange">
                                        <FontAwesomeIcon icon={regular('pen-to-square')} className="edit fa-icon" />
                                        Редактирай
                                    </Link>
                                    <button className="button red"
                                        onClick={() => {
                                            setIsModalOpen(true);
                                            setModalObject({ message: 'Сигурни ли сте, че искате да изтриете записа?', type: 'confirm' });
                                            setCurrentDocumentId(document.id);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={regular('trash-can')} className="delete fa-icon" />
                                        Изтрий
                                    </button>
                                </>
                            }
                        </div>
                    </div>
                ))
            }
        </>
    )
}