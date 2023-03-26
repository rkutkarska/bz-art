import React from 'react';
import { CategoryItems } from './CategoryItems';
import './Categories.css';
import { useEffect, useState } from "react";
import * as categoriesService from '../../../services/categoriesService';

export const Categories = () => {
    const [categoryItems, setCategoryItems] = useState([]);
    useEffect(() => {
        categoriesService.getAll()
            .then(categories => setCategoryItems(categories));
    }, []);

    return (
        <article className="category">
            <h1 className="caption">Категории</h1>
            <div className="category__items">
                {categoryItems.length > 0
                    ? <CategoryItems categories={categoryItems} />
                    : <p className="no-categories">Все още няма добавени категории...</p>
                }
            </div>
        </article>
    );
}