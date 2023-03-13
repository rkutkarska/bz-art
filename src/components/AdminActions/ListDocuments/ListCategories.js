import React from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

import styles from './ListDocuments.module.css';

export const ListCategories = ({ documents }) => {
    // console.log(documents);

    return (
        <>
            <div className={`${styles.table__header} ${styles.table__row}`}>
                <div></div>
                <div>Име</div>
                <div>Създаден на</div>
                <div>Действия</div>
            </div>
            {
                documents.map(document => (
                    <div key={document.id} className={styles.table__row}>
                        <img src={document.categoryImageUrl} alt={document.categoryName} />
                        <div>{document.categoryName}</div>

                        <div>{document.dateCreated.toDate().toLocaleString("bg-BG", {dateStyle: 'long', timeStyle: "short"})}</div>
                        <div className={styles.row__actions}>
                            <Link to="" className={styles.view}>
                                <FontAwesomeIcon icon={regular('eye')} className={`${styles.view} ${"fa-icon"}`} />
                                Прегледай
                            </Link>
                            <Link to="" className={styles.edit}>
                                <FontAwesomeIcon icon={regular('pen-to-square')} className="edit fa-icon" />
                                Редактирай
                            </Link>
                            <Link to="" className={styles.delete}>
                                <FontAwesomeIcon icon={regular('trash-can')} className="delete fa-icon" />
                                Изтрий
                            </Link>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
