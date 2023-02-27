import React from 'react';
import { CategoryItems } from './CategoryItems';
import '../../../styles/Category.css';

export const Category = () => {
    return (
        <article className="category">
            <h1 className="caption">Категории</h1>
            <div className="category__items">
                <CategoryItems />
            </div>
        </article>
    );
}