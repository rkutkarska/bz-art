import React, { useEffect, useState } from "react";

import { ModalTemplate } from "../../../Modals/ModalTemplate";

import * as categoriesService from "../../../../services/categoriesService";
import styles from "./AddCategory.module.css";

export const AddCategory = ({ ...props }) => {
    const [categoriesData, updateCategoriesData] = useState({
        categoryName: '',
        categoryImageUrl: '',
        dateCreated: {}
    });

    const [categories, setCategories] = useState([]);
    const [hidden, setHidden] = useState(true);
    const [addCategory, setAddCategory] = useState(true);
    const [imageUpload, setImageUpload] = useState('');
    const [categoryNameHasError, setCategoryNameHasError] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalObject, setModalObject] = useState({});

    useEffect(() => {
        categoriesService.getAll()
            .then(categories => setCategories(categories));
    }, []);

    const handleChange = (e) => {
        updateCategoriesData((oldValues) => ({
            ...oldValues,
            [e.target.name]: e.target.value.trim()
        }))

        props.props.updateItemsData((oldItemsData) => ({
            ...oldItemsData,
            [e.target.name]: e.target.value.trim()
        }))
    }

    const renderCategoriesOptions = () => {
        if (categories.length === 0) {
            return (<span>Все още няма добавени категории...</span>);
        }

        return (
            <select name="categoryName" id="available-categories" defaultValue='DEFAULT' onChange={handleChange} required >
                <option value="DEFAULT" disabled={true}>-- Моля, изберете --</option>
                {
                    categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.categoryName}
                        >
                            {category.categoryName}
                        </option>
                    ))
                }
            </select>
        )
    }

    return (
        <>
            <div className={styles["add-category"]}>
                <label htmlFor="available-categories" className={styles["existing-categories"]}>Категория: </label>
                {renderCategoriesOptions()}
                {props.props.categoryHasError && <p className="form-error">Категорията е задължителна!</p>}

                <div className={styles["category-label"]}>
                    <label htmlFor="category-name">Липсва категория? Добавете я:</label>
                    <input type="button"
                        value={addCategory ? "Добави" : "Отказ"}
                        className={addCategory ? "button blue" : "button red"}
                        onClick={() => {
                            setHidden(s => !s);
                            setAddCategory(!addCategory);
                        }}
                    />
                    {isModalOpen ? <ModalTemplate obj={{ modalObject, setIsModalOpen }} /> : false}

                </div>
                {
                    !hidden
                        ? <form className={styles["category-form"]}>
                            <input
                                className={styles.categoryName}
                                id="categoryName"
                                type="text"
                                name="categoryName"
                                placeholder="Име на категория"
                                onChange={handleChange}
                                onBlur={(e) => categoriesService.validateName(e, setCategoryNameHasError)}
                            />
                            {categoryNameHasError && <p className="form-error">Името трябва да е с дължина от поне 3 символа!</p>}

                            <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} id="images" accept="image/*" name="categoryImageUrl" required />
                            <input type="submit" className="button green" value="Запази"
                                onClick={(e) => {
                                    categoriesService.saveCategory(e, categories, categoriesData, imageUpload, setCategories, setCategoryNameHasError, setIsModalOpen, setModalObject);
                                    setHidden(s => !s);
                                    setAddCategory(!addCategory);
                                    setImageUpload('');
                                }}
                            />
                        </form>
                        : null
                }
            </div>
        </>
    );
}