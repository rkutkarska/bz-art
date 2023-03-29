import React, { useEffect, useState } from "react";

import * as categoriesService from "../../../../services/categoriesService";
import styles from "./AddCategory.module.css";

export const AddCategory = ({updateItemsData}) => {
    const [categoriesData, updateCategoriеsData] = useState({
        categoryName: '',
        categoryImageUrl: '',
        dateCreated: {}
    });

    const [categories, setCategories] = useState([]);
    const [hidden, setHidden] = useState(true);
    const [addCategory, setAddCategory] = useState(true);
    const [imageUpload, setImageUpload] = useState('');

    useEffect(() => {
        categoriesService.getAll()
            .then(categories => setCategories(categories));
    }, []);

    const handleChange = (e) => {
        updateCategoriеsData((oldValues) => ({
            ...oldValues,
            [e.target.name]: e.target.value.trim()
        }))

            updateItemsData((oldItemsData) => ({
            ...oldItemsData,
            [e.target.name]: e.target.value.trim()
        }))
    }

    const renderCategoriesOptions = () => {
        if (categories.length === 0) {
            return (<span>Все още няма добавени категории...</span>);
        }

        return (
            <select name="categoryName" id="available-categories" value={categoriesData.categoryName ? categoriesData.categoryName : 'DEFAULT'} onChange={handleChange} required >
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
            <label htmlFor="available-categories" className={styles["existing-categories"]}>Категория: </label>
            {renderCategoriesOptions()}
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
            </div>
            {
                !hidden
                    ? <div className={styles["category-form"]}>
                        <input className={styles.categoryName} id="categoryName" type="text" name="categoryName" placeholder="Име на категория" onChange={handleChange} />
                        <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} id="images" accept="image/*" name="categoryImageUrl" required />
                        <input type="submit" className="button green" value="Запази"
                            onClick={(e) => {
                                categoriesService.saveCategory(e, categories, categoriesData, imageUpload, setCategories);
                                setHidden(s => !s);
                                setAddCategory(!addCategory);
                            }}
                        />
                    </div>
                    : null
            }
        </>
    );
}