import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import * as shoppingCartService from '../../services/shoppingCartService';
import * as itemsService from '../../services/itemsService';

import styles from './ShoppingCart.module.css';

export const ShoppingCart = () => {
    const [itemsCount, setItemsCount] = useState(0);
    const [userItems, setUserItems] = useState([]);
    const [itemsInCart, setItemsInCart] = useState([]);
    const [desiredQty, setDesiredQty] = useState()
    const { currentUser } = useAuth();

    // TODO get desiredQty
    const handleChange = (e) => {
        if (e.target.type === 'number') {
            // setItemsCount(x => x = Number(e.target.value));
        }
    }

    useEffect(() => {
        shoppingCartService.getItemsInCart(currentUser.uid)
            .then(items => {
                setUserItems(items);
            })
    }, []);

    useEffect(() => {
        let ids = userItems.map(x => x.id);
        itemsService.getItemsByIds(ids)
        .then((items) => setItemsInCart(items));
    }, [userItems])

    return (<>
        <div className={`container ${styles.cart}`}>
            <h1>Артикули добавени в количката</h1>
            <div className={styles.cart__content}>
                <div className={styles.cart__items} onChange={handleChange}>
                    {
                        itemsInCart.map(item => (
                            <div key={item.id} className={styles.cart__item}>
                                <input type="checkbox" />
                                <img src={item.imageUrl} alt={item.name} />
                                <div className={styles.item__description}>
                                    <Link to={`/items/${item.id}`}>
                                        <p>{item.type} {item.name}</p>
                                    </Link>
                                    <h2>{item.price} лв.</h2>
                                </div>
                                <input type="number" min="1" max={item.quantity} />
                                <div className={styles.item__actions}>
                                    <button>
                                        <FontAwesomeIcon icon={solid('heart')} className={`fa-icon ${styles["solid-heart"]}`} />
                                    </button>
                                    <button>
                                        <FontAwesomeIcon icon={solid('trash-can')} className={`fa-icon ${styles.trash}`} />
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className={styles.cart__summary}>
                    <h2>Общо:</h2>
                    <p className={styles.summary__count}>{itemsCount} артикула</p>
                    <p className={styles.summary__price}>250 лв.</p>
                    <button className="button green">Поръчай</button>
                </div>
            </div>
        </div>
    </>
    );
}