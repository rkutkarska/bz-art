import React from 'react';
import { CategoryItems } from './CategoryItems';
import '../styles/Category.css';

export const Category = () => {
    return (
        <article class="category">
            <h1 className="caption">Категория</h1>
            <div className="category__items">
                <CategoryItems />
            </div>
        </article>
    );
}