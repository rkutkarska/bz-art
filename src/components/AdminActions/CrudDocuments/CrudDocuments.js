import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { ListItems } from "./ListItems";
import { ListCategories } from "./ListCategories";
import { ListMaterials } from "./ListMaterials";

import * as adminService from '../../../services/adminService';
import styles from './CrudDocuments.module.css';

export const CrudDocuments = () => {

    const [documents, setDocuments] = useState([]);
    const [documentType, setDocumentType] = useState('');
    const [isHidden, setHidden] = useState(false);
    const searchString = useRef('');
    const searchOption = useRef('');
    const isClicked = useRef(false);
    const documentSortType = useRef('');

    useEffect(() => {
        getDocument();
    }, [])

    const getDocument = () => {
        adminService.getAllItemsOrdered(documentType, documentSortType.current)
            .then((result) => {
                if (result) {
                    setDocuments(result.docs.map(item => ({ ...item.data(), id: item.id })));
                    isClicked.current = true;
                }
            });
    }

    const handleDocumentNameChange = (e) => {
        setDocumentType(oldValue => oldValue = e.target.value);
        documentSortType.current = '';
        e.target.parentElement.nextSibling.children[1].value = "DEFAULT";
    }

    const handleDocumentSorTypeChange = (e) => {
        documentSortType.current = e.target.value;
    }

    const handleDocumentSearch = (e) => {
        searchString.current = e.target.value;
    }

    const handleSearchOption = (e) => {
        searchOption.current = e.target.value;
    }

    const onSearch = () => {

        if (searchOption.current === "") {
            alert('Моля, изберете опция за търсене!');
            return;
        }

        if (searchString.current === "") {
            alert('Моля, въведете думата, която търсите!')
            return;
        }

        const newDoc = documents.filter(document => {
            if (((document[searchOption.current]).toLowerCase().trim()).includes(searchString.current.toLowerCase().trim())) {
                return document;
            }
        })

        setDocuments(newDoc);
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
                                    <option value="dateCreated, asc">Дата възходящ</option>
                                    <option value="dateCreated, desc">Дата низходящ</option>
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
                        className="button green"
                    >
                        Извлечи
                    </button>
                </div>

                {
                    isHidden && <div className={styles.document__search}>
                        <div>
                            <span>Търсене в:</span>
                            <select className={styles["search-option"]} defaultValue={"DEFAULT"} name="document-search" onChange={handleSearchOption}>
                                <option value="DEFAULT" disabled={true}>-- Моля, изберете --</option>
                                {documentType === "items" &&
                                    <>
                                        <option value="name">Име</option>
                                        <option value="description">Описание</option>
                                        <option value="price">Цена</option>
                                        <option value="type">Вид</option>
                                        <option value="materialName">Материал</option>
                                    </>
                                }

                                {documentType === "categories" &&
                                    <>
                                        <option value="categoryName">Име</option>
                                    </>
                                }

                                {documentType === "materials" &&
                                    <>
                                        <option value="materialName">Име</option>
                                    </>
                                }
                            </select>
                        </div>
                        <div>
                            <span>За:</span>
                            <input className={styles["search-value"]} placeholder="Търсене..." type="text" onChange={handleDocumentSearch} />
                        </div>

                        <button className="button green" onClick={(e) => { onSearch(); isClicked.current = true; }}>Търсене</button>
                    </div>
                }

                <div className={styles["add-document"]}>
                    {
                        documentType === 'categories' &&
                        <Link to="/create-category" className="button blue">+ Добавяне на категория</Link>
                    }

                    {
                        documentType === 'items' &&
                        <Link to="/create-item" className="button blue">+ Добавяне на артикул</Link>
                    }

                    {
                        documentType === 'materials' &&
                        <Link to="/create-material" className="button blue">+ Добавяне на материал</Link>
                    }

                </div>
            </div>

            {/* Table with results */}
            <div className={styles.container__table}>
                {isClicked.current && documentType == 'items' && <ListItems documents={{ documents, isClicked, setDocuments }} />}
                {isClicked.current && documentType == 'categories' && <ListCategories documents={{ documents, isClicked, setDocuments }} />}
                {isClicked.current && documentType == 'materials' && <ListMaterials documents={{ documents, isClicked, setDocuments }} />}
            </div>

            {/* TODO paginaton */}
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