import React, { useEffect } from "react";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase";
// import { Spinner } from "./spinner/Spinner";

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
    const [hidden, setHidden] = useState(true);
    const [addCategory, setAddCategory] = useState(true);
    const [currentCategory, setCurrentCategory] = useState('');
    // const [loading, setLoading] = useState(true);

    const categoriesCollectionRef = collection(db, "categories");

    useEffect(() => {
        // setTimeout(function () {
        categoriesService.getAll()
            .then(categories => setCategories(categories));
        // setLoading(false);
        // }, 1000);
    }, []);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
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

            setCurrentCategory(formData.name);
            e.target.previousSibling.value = "";
        }
    };


    const renderCategoriesOptions = (categories) => {
        if (categories.length === 0) {
            return (<span>Все още няма добавени категории...</span>);
        }

        return (
            // onChange={currentCategory ? currentCategory : 'DEFAULT'}
            <select defaultValue={'DEFAULT'} required>
                <option value="DEFAULT" disabled={true}>-- Моля, изберете --</option>
                {
                    categories.map((category) => (
                        <option
                            selected={currentCategory}
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

    // let categoriesList;

    // if (loading) {
    //     categoriesList = <Spinner />;
    // } else {
    //     categoriesList = (renderCategoriesOptions(categories));
    // }

    return (
        <>
            <label className="existing-categories">Налични категории: </label>
            {renderCategoriesOptions(categories)}
            <div className="category-label">
                <label htmlFor="name">Липсва категория? Добавете я:</label>
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
                        <input type="text" name="name" placeholder="Име на категория" onChange={handleChange} />
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