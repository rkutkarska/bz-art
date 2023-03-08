import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import * as adminService from '../../../services/adminService';
import styles from './ListDocuments.module.css';

export const ListDocuments = () => {

    useEffect(() => {
        adminService.getAllCollectionNames()
        // .then((result) => console.log(result));
    }, [])


    return (
        <div className={styles.container}>
            <h1>Документи</h1>
            <div className={styles.container__actions}>
                <div>
                    <label htmlFor="documents">Търсене в:</label>
                    <select name="documents-name" id="documents">
                        <option>categories</option>
                        <option>materials</option>
                        <option>items</option>
                    </select>
                    <input type="text" />
                </div>
                <button className="button blue">+ Добави</button>
            </div>
            <div className={styles.container__table}>
                <div className={`${styles.table__header} ${styles.table__row}`}>
                    <div>ID</div>
                    <div>Име</div>
                    <div>Категория</div>
                    <div>Действия</div>
                </div>
                <div className={styles.table__row}>
                    <div>5824</div>
                    <div>
                        <img src="" alt="" />
                        Aurora
                    </div>
                    <div>Пръстени или нещо друго, което евентуално е по-дълго</div>
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
