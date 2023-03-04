import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import * as  categoriesService from "../services/categoriesService";
import * as  materialsService from "../services/materialsService";
import * as itemsService from "../services/itemsService";
import '../styles/UpdateItem.css';

export const UpdateItem = () => {
    // TODO get the specific id
    let id = 'KqQ3icCRUhR5fOvwXkLo';

    const [categories, setCategories] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [values, updateValues] = useState([]);
    const [imageUpload, setImageUpload] = useState('');
    const [item, setItem] = useState({});

    useEffect(() => {
        categoriesService.getAll()
            .then(categories => setCategories(categories));
    }, []);

    useEffect(() => {
        materialsService.getAll()
            .then(materials => setMaterials(materials));
    }, []);

    useEffect(() => {
        itemsService
            .getItem(id)
            .then((doc) => setItem(doc));
    }, []);

    const updateDocument = () => {
        // TODO
    }

    const handleChange = (e) => {
        updateValues((oldValues) => ({
            ...oldValues,
            [e.target.name]: e.target.value.trim()
        }))
    }

    const clearImage = (e) => {
        e.preventDefault();
        updateValues({ ...values, url: '' });
        e.target.previousSibling.value = '';
    };

    return (
        <div className="container">
            <div className="form-container">
                <h1>Редактиране на артикул</h1>
                <form onSubmit={updateDocument} onChange={handleChange} className="form">
                    <label htmlFor="name">Име</label>
                    <input value={item.name} id="name" type="text" name="name" placeholder="Име на артикул" required />
                    <label htmlFor="type">Вид</label>
                    <input value={item.type} id="type" type="text" name="type" placeholder="Вид артикул" required />

                    <label htmlFor="available-categories" className="existing-categories">Категории: </label>
                    <select name="category" id="available-categories" value={values.categoryName} onChange={handleChange} required >
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
                    <label htmlFor="material">Материал</label>
                    <select id="material" type="select" name="material" value={item.material} onChange={handleChange} required >
                        {
                            materials.map((material) => (
                                <option value={material.material} key={material.id}>
                                    {material.material}
                                </option>
                            ))
                        }
                    </select>
                    <label htmlFor="description">Описание</label>
                    <textarea value={item.description} id="description" name="description" cols="30" rows="3" placeholder="Въведете описание" />
                    <div className="flex-items">
                        <div className="flex-items__item">
                            <label htmlFor="price">Цена</label>
                            <input value={item.price} id="price" type="number" step="0.01" min="0.00" name="price" placeholder="0.00" required />
                            <p>BGN</p>
                        </div>
                        <div className="flex-items__item">
                            <label htmlFor="discount">Намаление</label>
                            <input value={item.discount} id="discount" type="number" step="0.01" min="0.00" name="discount" placeholder="0.00" />
                            <p>BGN</p>
                        </div>
                    </div>

                    <div className="form-check">
                        <label htmlFor="index-label">Етикет начало:</label>
                        <div>
                            <input checked={item.isNew} id="isNew" className="form-check-input" type="checkbox" name="isNew" value={values.isNew} />
                            <label htmlFor="isNew">Ново</label>
                        </div>

                        <div>
                            <input checked={item.hasDiscount} id="hasDiscount" className="form-check-input" type="checkbox" name="hasDiscount" value={values.hasDiscount} />
                            <label htmlFor="hasDiscount">Промоция</label>
                        </div>
                    </div>
                    <label htmlFor="image" className="drop-container">
                        <span className="drop-title">Провлачете снимка тук</span>
                        или
                        <div className="flex-items">
                            <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} id="images" accept="image/*" name="url" required />
                            <button className="button purple" onClick={clearImage}><FontAwesomeIcon icon={solid('trash')} className="fa-icon" />Премахни</button>
                        </div>
                        <img className="image__preview" src={item.url} />
                    </label>

                    <input type="submit" className="button yellow" value="Обнови" />
                </form>
            </div>
        </div>
    );
}