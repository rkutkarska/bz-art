import { useEffect, useState } from "react";
import { CategoryItems } from './CategoryItems';

import * as categoriesService from '../../../services/categoriesService';
import './Categories.css';

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
                    : <p className="no-categories">Няма добавени категории!</p>
                }
            </div>
        </article>
    );
}