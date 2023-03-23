import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

import { ModalTemplate } from "../../Modals/ModalTemplate";

import * as adminService from '../../../services/adminService';
import styles from './CrudDocuments.module.css';

export const ListItems = ({ documents }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalObject, setModalObject] = useState({});
    const [currentDocumentId, setCurrentDocumentId] = useState('');

    documents.isClicked.current = !documents.isClicked.current;

    const handleClick = (isConfirmed) => {
        if (isConfirmed) {
            adminService.deleteItem(
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

            <div className={`${styles.table__header} ${styles.table__row}`}>
                <div></div>
                <div>Име</div>
                <div>Категория</div>
                <div>Действия</div>
            </div>
            {
                documents.documents.map(document => (
                    <div key={document.id} className={styles.table__row}>
                        <img src={document.imageUrl} alt={document.name} />
                        <div>{document.name}</div>
                        <div>{document.categoryName}</div>

                        <div className={styles.row__actions}>
                            <Link to={`/read-item/${document.id}`} className="button green">
                                <FontAwesomeIcon icon={regular('eye')} className={`${styles.view} ${"fa-icon"}`} />
                                Прегледай
                            </Link>
                            <Link to={`/update-item/${document.id}`} className="button orange">
                                <FontAwesomeIcon icon={regular('pen-to-square')} className="edit fa-icon" />
                                Редактирай
                            </Link>
                            <button
                                className="button red"
                                onClick={() => {
                                    setIsModalOpen(true);
                                    setModalObject({ message: 'Сигурни ли сте, че искате да изтриете записа?', type: 'confirm' });
                                    setCurrentDocumentId(document.id);
                                }}
                            >
                                <FontAwesomeIcon icon={regular('trash-can')} className="delete fa-icon" />
                                Изтрий
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}