import React, { useEffect, useState } from "react";
import * as adminService from '../../../services/adminService';
import styles from './ListDocuments.module.css';

import { ListItems } from "./ListItems";
import { ListCategories } from "./ListCategories";

export const ListDocuments = () => {

    const [documents, setDocuments] = useState([]);
    const [documentType, setDocumentType] = useState('');
    const [documentSortType, setDOcumentSortType] = useState('');
    const [isHidden, setHidden] = useState(false);
    const [isDisabled, setDisabled] = useState('disabled');

    useEffect(() => {
        getDocument();
    }, [])

    const getDocument = () => {
        adminService.getAllItemsOrdered(documentType, documentSortType)
            .then((result) => result && setDocuments(result.docs.map(item => ({ ...item.data(), id: item.id }))));
    }

    const handleDocumentNameChange = (e) => {
        setDocumentType(oldValue => oldValue = e.target.value);
        setDisabled('');
    }

    const handleDocumentSorTypeChange = (e) => {
        setDOcumentSortType(oldValue => oldValue = e.target.value)
    }

    return (
        <div className={styles.container}>
            <h1>Документи</h1>
            <div className={styles.container__actions}>
                <div className={styles.document__name}>
                    <div>
                        <span>Документ: </span>
                        <select className={styles["document-name"]} defaultValue={"DEFAULT"} name="document-name" onChange={handleDocumentNameChange} required >
                            <option value="DEFAULT" disabled={true}>-- Моля, изберете --</option>
                            <option value='items'>Артикули</option>
                            <option value='categories'>Категории</option>
                            <option value='materials'>Материали</option>
                        </select>
                    </div>
                    <div>
                        <span>Сортирай по:</span>
                        <select className={styles["document-sort"]} defaultValue={"DEFAULT"} name="document-sort" onChange={handleDocumentSorTypeChange} required>
                            <option value="DEFAULT" disabled={true}>-- Моля, изберете --</option>
                            {documentType == 'items' &&
                                <>
                                    <option value="name, asc">Име А-Я</option>
                                    <option value="name, desc">Име Я-А</option>
                                    <option value="categoryName, asc">Категория А-Я</option>
                                    <option value="categoryName, desc">Категория Я-А</option>
                                    <option value="price, asc">Цена възходящ</option>
                                    <option value="price, desc">Цена низходящ</option>
                                </>
                            }

                            {
                                documentType == 'categories' &&
                                <>
                                    <option value="categoryName, asc">Име А-Я</option>
                                    <option value="categoryName, desc">Име Я-А</option>
                                </>
                            }

                            {
                                documentType == 'materials' &&
                                <>
                                {/* TODO - create material */}
                                    <option value="materialName, asc">Име А-Я</option>
                                    <option value="materialName, desc">Име Я-А</option>
                                </>
                            }
                        </select>

                    </div>
                    <button onClick={(e) => {
                        getDocument();
                        setHidden(true);
                    }}
                        disabled={isDisabled}
                        className="button green"
                    >
                        Извлечи
                    </button>
                </div>

                {
                    isHidden && <div className={styles.document__search}>
                        <div>
                            <span>Търсене в:</span>
                            <select className={styles["search-option"]} defaultValue={"DEFAULT"} name="document-search" onChange={handleDocumentSorTypeChange}>
                                <option value="DEFAULT" disabled={true}>-- Моля, изберете --</option>
                                <option value="name">Име</option>
                                <option value="description">Описание</option>
                                <option value="price">Цена</option>
                                <option value="type">Вид</option>
                            </select>
                        </div>
                        <div>
                            <span>За:</span>
                            <input className={styles["search-value"]} placeholder="Търсене..." type="text" />
                        </div>

                        <button className="button green">Търсене</button>
                    </div>
                }
            </div>

            {/* Table with results */}
            <div className={styles.container__table}>
                {documentType == 'items' && <ListItems documents={documents} />}
                {documentType == 'categories' && <ListCategories documents={documents} />}
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