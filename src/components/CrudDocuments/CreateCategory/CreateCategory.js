import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { ModalTemplate } from "../../Modals/ModalTemplate";

import * as categoriesService from "../../../services/categoriesService";
import "./CreateCategory.css";

export const CreateCategory = () => {
    const [categoriesData, updateCategoriesData] = useState({
        categoryName: '',
        categoryImageUrl: '',
        dateCreated: {}
    });

    const [categories, setCategories] = useState([]);
    const [imageUpload, setImageUpload] = useState('');
    const [categoryNameHasError, setCategoryNameHasError] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalObject, setModalObject] = useState({});

    useEffect(() => {
        categoriesService.getAll(setIsModalOpen, setModalObject)
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

    // TODO drag and drop image
    // TODO modal
    return (
        <div className="container categories create">

            {isModalOpen ? <ModalTemplate obj={{ modalObject, setIsModalOpen }} /> : false}

            <div className="form-container">
                <h1>Създаване на категория</h1>
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
                <form className="category-form">
                    <input
                        id="categoryName"
                        type="text"
                        name="categoryName"
                        placeholder="Име на категория"
                        onChange={handleChange}
                        onBlur={(e) => categoriesService.validateName(e, setCategoryNameHasError)}
                        required
                    />

                    {categoryNameHasError && <p className="form-error">Името трябва да е с дължина от поне 3 символа!</p>}

                    <label htmlFor="image" className="drop-container">
                        <span className="drop-title">Провлачете снимка тук</span>
                        или
                        <div className="flex-items">
                            <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} id="image" accept="image/*" name="categoryImageUrl" required />
                            <button className="button red" onClick={clearImage}><FontAwesomeIcon icon={solid('trash')} className="fa-icon" />Премахни</button>
                        </div>
                    </label>

                    <div className="buttons">
                        <Link className="button red close " to="/crud-documents">Затвори</Link>
                        <input type="submit" className="button green create" value="Запази"
                            onClick={(e) => {
                                categoriesService.saveCategory(e, categories, categoriesData, imageUpload, setCategories, setCategoryNameHasError, setIsModalOpen, setModalObject);
                                !categoryNameHasError && imageUpload && (e.target.parentElement.parentElement.reset() && setImageUpload(''))
                            }}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}