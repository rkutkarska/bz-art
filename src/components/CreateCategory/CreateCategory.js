import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import * as categoriesService from "../../services/categoriesService";
import "../../styles/CreateCategory.css";

export const CreateCategory = () => {
    const [categoriesData, updateCategoriеsData] = useState({
        categoryName: '',
        categoryImageUrl: '',
        dateCreated: {}
    });

    const [categories, setCategories] = useState([]);
    const [imageUpload, setImageUpload] = useState('');

    useEffect(() => {
        categoriesService.getAll()
            .then(categories => setCategories(categories));
    }, []);

    const clearImage = (e) => {
        e.preventDefault();
        updateCategoriеsData({ ...categoriesData, categoryImageUrl: '' });
        e.target.previousSibling.value = '';
    };

    const handleChange = (e) => {
        updateCategoriеsData((oldValues) => ({
            ...oldValues,
            [e.target.name]: e.target.value.trim()
        }))
    }

    // TODO drag and drop image
    // TODO modal
    return (
        <div className="container">
            <div className="form-container">
                <h1>Добавяне на категория</h1>
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

                <div className="category-label">
                    <label htmlFor="category-name">Име на категория:</label>
                </div>
                <div className="category-form">
                    <input id="categoryName" type="text" name="categoryName" placeholder="Име на категория" onChange={handleChange} />
                    <label htmlFor="image" className="drop-container">
                        <span className="drop-title">Провлачете снимка тук</span>
                        или
                        <div className="flex-items">
                            <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} id="image" accept="image/*" name="categoryImageUrl" required />
                            <button className="button red" onClick={clearImage}><FontAwesomeIcon icon={solid('trash')} className="fa-icon" />Премахни</button>
                        </div>
                    </label>

                    <input type="submit" className="button green" value="Запази"
                        onClick={(e) => {
                            categoriesService.saveCategory(e, categories, categoriesData, imageUpload, setCategories);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}