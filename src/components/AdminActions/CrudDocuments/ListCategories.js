import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';

// import { ModalTemplate } from "../../Modals/ModalTemplate";

import * as adminService from "../../../services/adminService";
import styles from './CrudDocuments.module.css';

export const ListCategories = ({ documents }) => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [modalObject, setModalObject] = useState({});

    documents.isClicked.current = !documents.isClicked.current;

    const onDelete = (...params) => {
        adminService.deleteCategory(...params);
            // setIsModalOpen,
            // setModalObject,
            // isConfirmed

    }

    // const handleClick = (isConfirmed) => {
    //     return isConfirmed;
    // }

    return (
        <>
            {/* {isModalOpen ? <ModalTemplate obj={{ modalObject, setIsModalOpen }} handleClick={handleClick} /> : false} */}

            <div className={`${styles.table__header} ${styles.table__row}`}>
                <div></div>
                <div>Име</div>
                <div>Създаден на</div>
                <div>Действия</div>
            </div>
            {
                documents.documents.map(document => (
                    <div key={document.id} className={styles.table__row}>
                        <img src={document.categoryImageUrl} alt={document.categoryName} />
                        <div>{document.categoryName}</div>

                        <div>{document.dateCreated.toDate().toLocaleString("bg-BG", { dateStyle: 'long', timeStyle: "short" })}</div>
                        <div className={styles.row__actions}>
                            <Link to={`/read-category/${document.id}`} className="button green">
                                <FontAwesomeIcon icon={regular('eye')} className={`${styles.view} ${"fa-icon"}`} />
                                Прегледай
                            </Link>
                            <Link to={`/update-category/${document.id}`} className="button orange">
                                <FontAwesomeIcon icon={regular('pen-to-square')} className="edit fa-icon" />
                                Редактирай
                            </Link>
                            <button className="button red"
                                onClick={() => onDelete(document.id, documents.documents, documents.setDocuments, documents.isClicked)}
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
