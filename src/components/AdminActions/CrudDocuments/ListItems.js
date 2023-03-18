import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

import { Link } from 'react-router-dom';
import * as adminService from '../../../services/adminService';
import styles from './CrudDocuments.module.css';

export const ListItems = ({ documents }) => {

    documents.isClicked.current = !documents.isClicked.current;

    return (
        <>
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
                            <Link to={`/read-item/${document.id}`}  className="button green">
                                <FontAwesomeIcon icon={regular('eye')} className={`${styles.view} ${"fa-icon"}`} />
                                Прегледай
                            </Link>
                            <Link to={`/update-item/${document.id}`}className="button orange">
                                <FontAwesomeIcon icon={regular('pen-to-square')} className="edit fa-icon" />
                                Редактирай
                            </Link>
                            <button
                                className="button red"
                                onClick={() => adminService.deleteItem(document.id, documents.documents, documents.setDocuments, documents.isClicked)}
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