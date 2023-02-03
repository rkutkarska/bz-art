import React, { useEffect } from "react";
import { useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

import "../styles/CreateCategory.css";

export const CreateCategory = () => {
    const initialFormData = Object.freeze({
        'name': '',
        'url': '',
        'dateCreated': ''
    });

    const [formData, updateFormData] = useState(initialFormData);
    const [categories, setCategories] = useState([]);
    const categoriesCollectionRef = collection(db, "categories");

    const fetchCategories = async () => {

        await getDocs(categoriesCollectionRef)
            .then((res => {
                const data = res.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setCategories(data);
            }))
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const saveCategory = (e) => {
        e.preventDefault();
        // first record
        if (categories.length === 0) {
            addDoc(categoriesCollectionRef, { ...formData, dateCreated: new Date() });
        }

        categories.map(x => {
            if (formData.name.toLowerCase() !== x.name.toLowerCase()) {
                addDoc(categoriesCollectionRef, { ...formData, dateCreated: new Date() });
                return;
            } else {
                alert('Категорията не е записана, защото вече има такава!');
                return;
            }
        });

        e.target.reset();
    };

    return (
        <div className="container">
            <div className="form-container">
                <h1>Добавяне на категория</h1>
                <form onSubmit={saveCategory} onChange={(e) => handleChange(e)} className="form">
                    <label htmlFor="name">Име</label>
                    <input type="text" name="name" placeholder="Име на категория" required />

                    <label className="existing-categories">Налични категории: </label>
                    {
                        categories.length !== 0
                            ? <ul className="category-list ul-clear" name="categories">{categories.map((category) => (<li className="category-list__item" key={category.id}>{category.name}</li>))}</ul>
                            : <span>Все още няма добавени категории</span>
                    }
                    <input type="submit" className="button yellow" value="Запиши" />
                </form>
            </div>
        </div>
    );
}