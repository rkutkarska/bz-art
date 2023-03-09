import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export const DiscountedItem = ({ items }) => {

    let discountedItemsList = [];

    for (var i = 0; i < items.length; i += 3) {
        discountedItemsList.push(
            <div key={'discounted' + i} className="discounted__items">
                {
                    items.slice(i, i + 3).map(item => (
                        <section key={item.id} className="discounted__item">
                            <img src={item.imageUrl} alt="ring" />
                            <div className="discounted__actions">
                                <div className="discounted__description">
                                    <p className="item-name">{item.name}</p>
                                    <p className="item-price">
                                        <s>{item.price}</s> лв.<br />
                                        <span className="final-price">{item.price - item.discount} лв.</span>
                                    </p>
                                </div>
                                <div className="discounted__tag">
                                    <div className="discount-tag">{`- ${((item.discount / item.price) * 100).toFixed(0)} %`}</div>
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
                }
            </div>
        );
    }

    return (
        <>
            {discountedItemsList}
        </>
    );
}