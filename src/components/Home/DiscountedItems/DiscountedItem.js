import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export const DiscountedItem = ({items}) => {
    return (
        items.map((item) => (
            <section key={item.id} className="discounted__item">
                <img src={item.imageUrl} alt="ring" />
                <div className="discounted__actions">
                    <div className="discounted__description">
                    <div class="ribbon ribbon-top-right"><span>Намаление</span></div>

                        <p className="item-name">{item.name}</p>
                        <p className="item-price"><s>{item.price}</s> лв.</p>
                    </div>
                    <div className="buttons">
                        <Link
                            className="button purple" to={`/items/${item.id}`}
                        >
                            <FontAwesomeIcon icon={solid('eye')} className="fa-icon" />
                            Детайли
                        </Link>
                        <Link
                            className="button yellow" to={`/items/${item.id}`}
                        >
                            <FontAwesomeIcon icon={solid('cart-shopping')} className="fa-icon" />
                            Добави
                        </Link>
                        {/* TODO add to cart functionality */}
                    </div>
                </div>
            </section >
        ))
    );
}