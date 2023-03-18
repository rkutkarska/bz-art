import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

import * as adminService from "../../../services/adminService";
import styles from './CrudDocuments.module.css';

export const ListCategories = ({ documents }) => {

    documents.isClicked.current = !documents.isClicked.current;

    return (
        <>
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
                            <button className="button green">
                                <FontAwesomeIcon icon={regular('eye')} className={`${styles.view} ${"fa-icon"}`} />
                                Прегледай
                            </button>
                            <button className="button orange">
                                <FontAwesomeIcon icon={regular('pen-to-square')} className="edit fa-icon" />
                                Редактирай
                            </button>
                            <button className="button red"
                                onClick={() => adminService.deleteCategory(document.id, documents.documents, documents.setDocuments, documents.isClicked)}
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
