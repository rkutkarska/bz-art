import React, { useEffect } from "react";
import { useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import { Spinner } from "./spinner/Spinner";

import * as categoriesService from '../services/categoriesService';

import "../styles/CreateCategory.css";

export const CreateCategory = () => {
    const initialFormData = Object.freeze({
        'name': '',
        'url': '',
        'dateCreated': ''
    });

    const [formData, updateFormData] = useState(initialFormData);
    const [categories, setCategories] = useState([]);
    let [loading, setLoading] = useState(true);

    const categoriesCollectionRef = collection(db, "categories");

    useEffect(() => {
        setTimeout(function () {
            categoriesService.getAll()
                .then(categories => setCategories(categories));
            setLoading(false);
        }, 1000);
    }, []);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const saveCategory = (e) => {
        e.preventDefault();

        if (categoriesService.checkIfExist(categories, formData)) {
            alert('Категорията не е записана, защото вече има такава!');
            return;
        } else {
            addDoc(categoriesCollectionRef, { ...formData, dateCreated: new Date() });
            categoriesService.getAll()
                .then(categories => setCategories(categories));

            // e.target.reset();
        }
    };

    const renderList = (categories) => {
        if (categories.length === 0) {
            return (<span>Все още няма добавени категории...</span>);
        }

        return categories.map((category) => (
            <li className="category-list__item" key={category.id}>
                <input name="category" type="radio" value={category.name} required />
                <label for="name">{category.name}</label>
            </li>
        ));
    }

    let categoriesList;

    if (loading) {
        categoriesList = <Spinner />;
    } else {
        categoriesList = (
            <ul className="category-list ul-clear" name="categories">
                {renderList(categories)}
            </ul>
        );
    }

    return (
        <>
            <label className="existing-categories">Налични категории: </label>
            {categoriesList}
            <div className="category-label">
                <label htmlFor="name">Липсва категория? Добавете я:</label>
                <input type="button" className="button yellow inline" value="Добави" />
            </div>
            <div className="category-form">
                <input type="text" name="name" placeholder="Име на категория" onChange={handleChange} />
                <input type="submit" className="button yellow" value="Запази" onClick={saveCategory} />
            </div>

        </>
    );
}