import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import * as usersItemsService from "../../../services/usersItemsService";

export const DiscountedItem = ({ items }) => {

    let discountedItemsList = [];
    const { currentUser } = useAuth();

    for (var i = 0; i < items.length; i += 3) {
        discountedItemsList.push(
            <div key={'discounted' + i} className="discounted__items">
                {
                    items.slice(i, i + 3).map(item => (
                        <section key={item.id} className="discounted__item">
                            <Link to={`/items/${item.id}`}><img src={item.imageUrl} alt="ring" /></Link>
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
                                    {
                                        currentUser &&
                                        <Link
                                            className="button yellow"
                                            onClick={(e) => {
                                                usersItemsService
                                                    .addToCart(e, currentUser.uid, item.id, 1)
                                            }}
                                        >
                                            <FontAwesomeIcon icon={solid('cart-shopping')} className="fa-icon" />
                                            Добави
                                        </Link>
                                    }
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