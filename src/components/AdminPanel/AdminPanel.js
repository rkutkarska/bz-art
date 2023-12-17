import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { ListUsers } from "./ListUsers";
import { ListItems } from "./ListItems";
import { ListCategories } from "./ListCategories";
import { ListMaterials } from "./ListMaterials";
import { ModalTemplate } from "../Modals/ModalTemplate";

import { useAuth } from '../../context/AuthContext';
import * as usersService from '../../services/usersService';

import * as adminService from '../../services/adminService';
import styles from './AdminPanel.module.css';

export const AdminPanel = () => {

    const [documents, setDocuments] = useState([]);
    const [documentType, setDocumentType] = useState('');

    const { currentUser } = useAuth();
    const [userData, setUserData] = useState({});

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalObject, setModalObject] = useState({});

    const searchString = useRef('');
    const searchOption = useRef('');
    const documentSortType = useRef('');

    const isClicked = useRef(false);

    useEffect(() => {
        getDocument();
    }, [])

    const getDocument = () => {

        if (documentType) {
            adminService.getAllItemsOrdered(documentType, documentSortType.current, searchOption.current, searchString.current)
                .then((result) => {
                    if (result) {

                        let data = result.docs.map(item => ({ ...item.data(), id: item.id }));
                        let found = [];

                        // TODO The additional filtering should be handled by the database anyway
                        if (searchOption.current && searchString.current) {

                            switch (searchOption.current) {
                                case 'name':
                                    found = data.filter(obj => obj.name.toLowerCase().includes(searchString.current.toLowerCase()));
                                    break;
                                case 'description':
                                    found = data.filter(obj => obj.description.toLowerCase().includes(searchString.current.toLowerCase()));
                                    break;
                                case 'price':
                                    found = data.filter(obj => obj.price.toLowerCase().includes(searchString.current.toLowerCase()));
                                    break;
                                case 'type':
                                    found = data.filter(obj => obj.type.toLowerCase().includes(searchString.current.toLowerCase()));
                                    break;
                                case 'materialName':
                                    found = data.filter(obj => obj.materialName.toLowerCase().includes(searchString.current.toLowerCase()));
                                    break;
                                case 'categoryName':
                                    found = data.filter(obj => obj.categoryName.toLowerCase().includes(searchString.current.toLowerCase()));
                                    break;
                                case 'email':
                                    found = data.filter(obj => obj.email.toLowerCase().includes(searchString.current.toLowerCase()));
                                    break;
                            }

                        } else {
                            found = data;
                        }

                        setDocuments(found);
                        isClicked.current = true;
                    }
                });
        }

    }

    const handleDocumentNameChange = (e) => {
        setDocumentType(oldValue => oldValue = e.target.value);
        documentSortType.current = '';
        searchString.current = '';
        searchOption.current = '';

        // TODO set document-sort && document-search fields to DEFAULT in HTML. Hardcoded for the specific form but while loop perhaps?
        e.target.parentElement.nextSibling.children[1].value = "DEFAULT";
        e.target.parentElement.nextSibling.nextElementSibling.children[1].value = "DEFAULT"
        e.target.parentElement.nextSibling.nextElementSibling.nextElementSibling.children[1].value = ""
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

    const validate = () => {
        if (documentType === "") {
            setIsModalOpen(true);
            setModalObject({ message: 'Моля, изберете тип на документ', type: 'alert' });
            return;
        }
    }

    const getUserData = () => {
        if (currentUser) {
            usersService.getUserData(currentUser.uid)
                .then((res) => setUserData(res));
        }
    }

    useEffect(() => {
        getUserData();
    }, [])

    return (
        <div className={styles.container}>

            {isModalOpen ? <ModalTemplate obj={{ modalObject, setIsModalOpen }} /> : false}

            <h1>Документи</h1>
            <div className={styles.container__actions}>
                {
                    userData.role == 1 &&
                    <>
                        <h2>Създаване на нов документ</h2>
                        <div className={`${styles["add-document"]} buttons`}>
                            <Link to="/admin-panel/create-category" className="button blue">+ Нова категория</Link>
                            <Link to="/admin-panel/create-item" className="button blue">+ Нов артикул</Link>
                            <Link to="/admin-panel/create-material" className="button blue">+ Нов материал</Link>
                        </div>
                    </>
                }

                <h2>Търсене в документи и CRUD операции</h2>
                <div className={styles.document__search}>
                    <div>
                        <span>Документ: </span>
                        <select className={styles["document-name"]} defaultValue={"DEFAULT"} name="document-name" onChange={handleDocumentNameChange} required >
                            <option value="DEFAULT" disabled={true}>-- Моля, изберете --</option>
                            <option value='users'>Потребители</option>
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

                                // TODO user asc desc order
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

                    <div>
                        <span>Търсене в:</span>
                        <select className={styles["search-option"]} defaultValue={"DEFAULT"} name="document-search" onChange={handleSearchOption}>
                            <option value="DEFAULT" disabled={true}>-- Моля, изберете --</option>
                            {
                                documentType === "items" &&
                                <>
                                    <option value="name">Име</option>
                                    <option value="description">Описание</option>
                                    <option value="price">Цена</option>
                                    <option value="type">Вид</option>
                                    <option value="materialName">Материал</option>
                                </>
                            }

                            {
                                documentType === "categories" &&
                                <>
                                    <option value="categoryName">Име</option>
                                </>
                            }

                            {
                                documentType === "materials" &&
                                <>
                                    <option value="materialName">Име</option>
                                </>
                            }

                            {
                                documentType === "users" &&
                                <>
                                    <option value="email">Email</option>
                                </>
                            }

                        </select>
                    </div>

                    <div className={styles["search-keyword"]}>
                        <span>За:</span>
                        <input className={styles["search-value"]} placeholder="Търсене..." type="text" onChange={handleDocumentSearch} />
                    </div>

                    <button className={`button green ${styles["search-button"]} `} onClick={(e) => {
                        validate();
                        getDocument();
                    }}
                    >
                        Търси
                    </button>
                </div>
            </div>

            {/* Table with results */}
            <div className={styles.container__table}>
                {isClicked.current && documentType == 'users' && <ListUsers documents={{ documents, isClicked, setDocuments, 'currentUserRole': userData.role }} />}
                {isClicked.current && documentType == 'items' && <ListItems documents={{ documents, isClicked, setDocuments, 'currentUserRole': userData.role }} />}
                {isClicked.current && documentType == 'categories' && <ListCategories documents={{ documents, isClicked, setDocuments, 'currentUserRole': userData.role }} />}
                {isClicked.current && documentType == 'materials' && <ListMaterials documents={{ documents, isClicked, setDocuments, 'currentUserRole': userData.role }} />}
            </div>

            {/* TODO paginaton */}
            {/* <div className={styles.container__pagination}>
                <button className="button neutral">Предишен</button>
                <button className="button neutral">1</button>
                <button className="button neutral">2</button>
                <button className="button neutral">3</button>
                <button className="button neutral">Следващ</button>
            </div> */}
        </div>
    )
}