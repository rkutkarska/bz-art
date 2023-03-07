import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export const NewItem = ({ items }) => {
    return (
        items.map((item) => (
            <section key={item.id} className="new__item">
                <img src={item.imageUrl} alt="ring" />
                <div className="new__actions">
                    <div className="new__description">
                    <div className="new-tag">НОВО</div>
                        <p className="item-name">{item.name}</p>
                        <p className="item-price">{item.price} лв.</p>
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
    )
}