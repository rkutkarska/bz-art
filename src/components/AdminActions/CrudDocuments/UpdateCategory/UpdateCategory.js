import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import * as categoriesService from "../../../../services/categoriesService";

export const UpdateCategory = () => {
    const [categoriesData, updateCategoriesData] = useState({});
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({});

    const { categoryId } = useParams();
    const imageUpload = useRef('');

    useEffect(() => {
        categoriesService.getCategory(categoryId)
            .then((category) => {
                setCategory(category)
            });
    }, [])

    useEffect(() => {
        categoriesService.getAll()
            .then(categories => setCategories(categories));
    }, []);

    const clearImage = (e) => {
        e.preventDefault();
        updateCategoriesData({ ...categoriesData, categoryImageUrl: '' });
        e.target.previousSibling.value = '';
    };

    const handleChange = (e) => {
        updateCategoriesData((oldValues) => ({
            ...oldValues,
            [e.target.name]: e.target.value.trim()
        }))
    }

    const updateDocument = async (e) => {
        await categoriesService
            .updateCategory(e, categoryId, categoriesData, imageUpload, updateCategoriesData);
    }

    // TODO drag and drop image
    // TODO modal
    return (
        <div className="container categories">
            <div className="form-container">
                <h1>Редактиране на категория</h1>
                <div className="existing-categories">
                    <label htmlFor="available-categories" >Налични категории: </label>
                    {
                        categories.length === 0
                            ? <span>Все още няма добавени категории...</span>
                            : <ul name="categoryName" id="available-categories">
                                {
                                    categories.map((category) => (
                                        <li
                                            key={category.id}
                                            value={category.categoryName}
                                        >
                                            {category.categoryName}
                                        </li>
                                    ))
                                }
                            </ul>
                    }
                </div>

                <label>Име на категория:</label>
                <form className="category-form" onChange={handleChange}>
                    <input defaultValue={category.categoryName} type="text" name="categoryName" />
                    <label htmlFor="image" className="drop-container">
                        <span className="drop-title">Провлачете снимка тук</span>
                        или
                        <div className="flex-items">
                            <input
                                type="file"
                                onChange={(e) => {
                                    imageUpload.current = e.target.files[0];
                                    categoriesService.uploadCategoryImage(imageUpload.current, updateCategoriesData);
                                }}
                                accept="image/*"
                                name="categoryImageUrl"
                                id="image"
                            />
                            <button className="button red" onClick={clearImage}><FontAwesomeIcon icon={solid('trash')} className="fa-icon" />Премахни</button>
                        </div>
                    </label>

                    <img src={category.categoryImageUrl} alt={category.categoryName} />
                    <div /*className={styles.buttons}*/ >
                        <button onClick={updateDocument} className="button orange">Обнови</button>
                        <Link to={'/crud-documents'} className="button red">Затвори</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}