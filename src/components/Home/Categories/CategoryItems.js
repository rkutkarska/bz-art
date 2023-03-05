import React from "react";

export const CategoryItems = ({categories}) => {

    return (
        categories.map(category => (
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