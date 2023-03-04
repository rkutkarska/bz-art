import React from "react";
import { useEffect, useState } from "react";
import * as categoriesService from '../../../services/categoriesService';

export const CategoryItems = () => {

    const [categoryItems, setCategoryItems] = useState([]);
    useEffect(() => {
        categoriesService.getAll()
            .then(categories => setCategoryItems(categories));
    }, []);

    return (
        categoryItems.map(category => (
            <section key={category.id} className="category__item">
                <a href={`/details/` + category.id}>
                    <img src={category.categoryImageUrl} alt="ring" />
                    <div className="overlay">
                        <p>{category.categoryName}</p>
                    </div>
                </a>
            </section>
        ))
    );
}