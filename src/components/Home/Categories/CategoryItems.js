import React from "react";
import { useEffect, useState } from "react";
import * as categoriesService from '../../../services/categoriesService';

export const CategoryItems = () => {

    const [categoryItems, setCategoryItems] = useState([]);
    useEffect(() => {
        categoriesService.getAll()
            .then(categories => setCategoryItems(categories));
    }, []);


    console.log(categoryItems);
    return (
        categoryItems.map(category => (
            <section className="category__item">
                <a href={`/details/` + category.div}>
                    <img src={category.categoryImageUrl} alt="ring" />
                    <div className="overlay">
                        <p>{category.categoryName}</p>
                    </div>
                </a>
            </section>
        ))
    );
}