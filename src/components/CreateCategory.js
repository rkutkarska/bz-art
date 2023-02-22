import React, { useEffect } from "react";
import { useState } from "react";

import * as categoriesService from "../services/categoriesService";
import "../styles/CreateCategory.css";

export const CreateCategory = () => {

    const [values, updateValues] = useState(
        {
            categoryName: '',
            categoryImageUrl: '',
            dateCreated: ''
        }
    );
    const [categories, setCategories] = useState([]);
    const [hidden, setHidden] = useState(true);
    const [addCategory, setAddCategory] = useState(true);
    const [imageUpload, setImageUpload] = useState('');

    useEffect(() => {
        categoriesService.getAll()
            .then(categories => setCategories(categories));
    }, []);

    const handleChange = (e) => {
        updateValues((oldValues) => ({
            ...oldValues,
            [e.target.name]: e.target.value.trim()
        }))
    }

    const renderCategoriesOptions = () => {
        if (categories.length === 0) {
            return (<span>Все още няма добавени категории...</span>);
        }

        return (
            <select name="categoryName" id="available-categories" value={values.categoryName ? values.categoryName : 'DEFAULT'} onChange={handleChange} required >
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
            <label htmlFor="available-categories" className="existing-categories">Категории: </label>
            {renderCategoriesOptions()}
            <div className="category-label">
                <label htmlFor="category-name">Липсва категория? Добавете я:</label>
                <input type="button" className="button yellow"
                    value={addCategory ? "+ Добави" : "x Отказ"}
                    onClick={() => {
                        setHidden(s => !s);
                        setAddCategory(!addCategory);
                    }}
                />
            </div>
            {
                !hidden
                    ? <div className="category-form">
                        <input id="categoryName" type="text" name="categoryName" placeholder="Име на категория" onChange={handleChange} />
                        <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} id="images" accept="image/*" name="categoryImageUrl" required />
                        <input type="submit" className="button yellow" value="Запази"
                            onClick={(e) => {
                                categoriesService.saveCategory(e, categories, values, imageUpload, setCategories);
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