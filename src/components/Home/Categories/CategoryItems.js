import React from "react";
import { Link } from "react-router-dom";

export const CategoryItems = ({categories}) => {

    return (
        categories.map(category => (
            <section key={category.id} className="category__item">
                <Link to={`/category/${category.id}/items`}>
                    <img src={category.categoryImageUrl} alt={category.categoryName} />
                    <div className="overlay">
                        <p>{category.categoryName}</p>
                    </div>
                </Link>
            </section>
        ))
    );
}