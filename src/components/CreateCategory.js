import React, { useEffect } from "react";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase";

import * as categoriesService from '../services/categoriesService';

import "../styles/CreateCategory.css";

export const CreateCategory = () => {

    const [formData, updateFormData] = useState(
        {
            name: '',
            url: '',
            dateCreated: ''
        }
    );
    const [categories, setCategories] = useState([]);
    const [hidden, setHidden] = useState(true);
    const [addCategory, setAddCategory] = useState(true);

    const categoriesCollectionRef = collection(db, "categories");

    useEffect(() => {
        categoriesService.getAll()
            .then(categories => setCategories(categories));
    }, []);

    const handleChange = (e) => {
        updateFormData((oldFormData) => ({
            ...oldFormData,
            [e.target.name]: e.target.value.trim()
        }))
    }

    const saveCategory = (e) => {
        e.preventDefault();

        if (categoriesService.checkIfExist(categories, formData)) {
            alert('Категорията не е записана, защото вече има такава!');
            return;
        } else if (formData.name === '') {
            alert('Моля, въведете категория!');
            return;
        } else {
            addDoc(categoriesCollectionRef, { ...formData, dateCreated: new Date() });
            categoriesService.getAll()
                .then(categories => {
                    setCategories(categories)
                });
            e.target.previousSibling.value = "";
        }
    };


    const renderCategoriesOptions = () => {
        if (categories.length === 0) {
            return (<span>Все още няма добавени категории...</span>);
        }

        return (
            <select name="name" id="available-categories" value={formData.name ? formData.name : 'DEFAULT'} onChange={handleChange} required >
                <option value="DEFAULT" disabled={true}>-- Моля, изберете --</option>
                {
                    categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.name}
                        >
                            {category.name}
                        </option>
                    ))
                }
            </select>
        )
    }

    return (
        <>
            <label htmlFor="available-categories" className="existing-categories">Налични категории: </label>
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
                        <input id="category-name" type="text" name="name" placeholder="Име на категория" onChange={handleChange}/>
                        <input type="submit" className="button yellow" value="Запази"
                            onClick={(e) => {
                                saveCategory(e);
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