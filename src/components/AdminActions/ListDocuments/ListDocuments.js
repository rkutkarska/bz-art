import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import * as adminService from '../../../services/adminService';
import styles from './ListDocuments.module.css';

export const ListDocuments = () => {

    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        adminService.getAllItemsOrdered()
            .then((result) => result.forEach(doc => {
                console.log(doc.data());
            }))
    }, [])

    console.log(documents);

    return (
        <div className={styles.container}>
            <h1>Документи</h1>
            <div className={styles.container__actions}>
                <div className={styles.document__name}>
                    <div>
                        <span>Документ: </span>
                        <select className={styles["document-name"]} name="document-name" id="documents">
                            <option>Категории</option>
                            <option>Материали</option>
                            <option>Артикули</option>
                        </select>
                    </div>
                    <div>
                        <span>Сортирай по:</span>
                        <select className={styles["document-sort"]} name="document-sort" id="documents">
                            <option>ID</option>
                            <option>Име А-Я</option>
                            <option>Име Я-А</option>
                            <option>Категория А-Я</option>
                            <option>Категория Я-А</option>
                        </select>
                    </div>
                    <button className="button green">Извлечи</button>
                </div>
                <div className={styles.document__search}>
                    <input placeholder="Търсене..." type="text" />
                    <button className="button green">Търсене</button>
                </div>
            </div>

            <div className={styles.container__table}>
                <div className={`${styles.table__header} ${styles.table__row}`}>
                    <div>ID</div>
                    <div>Име</div>
                    <div>Категория</div>
                    <div>Действия</div>
                </div>
                <div className={styles.table__row}>
                    <div>3025</div>
                    <div>
                        <img src="" alt="" />
                        Пръстени
                    </div>
                    <div>Aurora</div>
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

            </div>
            <div className={styles.container__pagination}>
                <button className="button neutral">Предишен</button>
                <button className="button neutral">1</button>
                <button className="button neutral">2</button>
                <button className="button neutral">3</button>
                <button className="button neutral">Следващ</button>
            </div>
        </div>
    )
}