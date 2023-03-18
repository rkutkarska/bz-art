import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { Link } from "react-router-dom";
import * as  categoriesService from "../../../../services/categoriesService";
import * as  materialsService from "../../../../services/materialsService";
import * as itemsService from "../../../../services/itemsService";

import styles from './UpdateItem.module.css';

export const UpdateItem = () => {

    const { itemId } = useParams();

    const [categories, setCategories] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [values, updateValues] = useState([]);
    const [imageUpload, setImageUpload] = useState('');
    const [item, setItem] = useState({});

    useEffect(() => {
        itemsService.getItem(itemId)
            .then((item) => {
                setItem(item)
            });
    }, [])

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
            .getItem(itemId)
            .then((doc) => setItem(doc));
    }, []);

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

    const updateDocument = async (e) => {
        await itemsService
            .updateItem(e, itemId, values)
    }

    return (
        <div className={`container ${styles.update}`}>
            <div className="form-container">
                <h1>Редактиране на артикул</h1>
                <form onChange={handleChange} className="form">
                    <label htmlFor="name">Име</label>
                    <input defaultValue={item.name} id="name" type="text" name="name" placeholder="Име на артикул" />
                    <label htmlFor="type">Вид</label>
                    <input defaultValue={item.type} id="type" type="text" name="type" placeholder="Вид артикул" />

                    <label htmlFor="available-categories" className="existing-categories">Категории: </label>
                    <select name="category" id="available-categories" value={values.categoryName} >
                        <option defaultValue="DEFAULT" disabled={true}>-- Моля, изберете --</option>
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
                    <select defaultValue={item.material} id="material" type="select" name="materialName" >
                        {
                            materials.map((material) => (
                                <option value={material.materialName} key={material.id}>
                                    {material.materialName}
                                </option>
                            ))
                        }
                    </select>
                    <label htmlFor="description">Описание</label>
                    <textarea defaultValue={item.description} id="description" name="description" cols="30" rows="3" placeholder="Въведете описание" />
                    <div className="flex-items">
                        <div className="flex-items__item">
                            <label htmlFor="price">Цена</label>
                            <input defaultValue={item.price} id="price" type="number" step="0.01" min="0.00" name="price" placeholder="0.00" required />
                            <p>BGN</p>
                        </div>
                        <div className="flex-items__item">
                            <label htmlFor="discount">Намаление</label>
                            <input defaultValue={item.discount} id="discount" type="number" step="0.01" min="0.00" name="discount" placeholder="0.00" />
                            <p>BGN</p>
                        </div>
                    </div>

                    <div className="form-check">
                        <label htmlFor="index-label">Етикет начало:</label>
                        <div>
                            <input defaultChecked={item.isNew} id="isNew" className="form-check-input" type="checkbox" name="isNew" value={values.isNew} />
                            <label htmlFor="isNew">Ново</label>
                        </div>

                        <div>
                            <input defaultChecked={item.hasDiscount} id="hasDiscount" className="form-check-input" type="checkbox" name="hasDiscount" value={values.hasDiscount} />
                            <label htmlFor="hasDiscount">Промоция</label>
                        </div>
                    </div>
                    <label htmlFor="image" className="drop-container">
                        <span className="drop-title">Провлачете снимка тук</span>
                        или
                        <div className="flex-items">
                            <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} id="images" accept="image/*" name="url" />
                            <button className="button red" onClick={clearImage}><FontAwesomeIcon icon={solid('trash')} className="fa-icon" />Премахни</button>
                        </div>
                        <img className={styles.image__preview} src={item.imageUrl} />
                    </label>
                    <div className={styles.buttons}>
                        <button onClick={updateDocument} className={`button orange ${styles.update}`}>Обнови</button>
                        <Link to="/crud-documents" className={`button red ${styles.close}`}>Затвори</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}