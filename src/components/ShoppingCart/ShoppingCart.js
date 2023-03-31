import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import * as shoppingCartService from '../../services/shoppingCartService';
import * as itemsService from '../../services/itemsService';

// import {ItemCounter} from '../ItemCounter';

import styles from './ShoppingCart.module.css';

export const ShoppingCart = () => {
    const [itemsCount, setItemsCount] = useState(0);
    const [itemsId, setItemsId] = useState([]);
    const [itemsInCart, setItemsInCart] = useState([]);
    const { currentUser } = useAuth();

    // const [purchaseData, setPurchaseData] = useState({});

    const handleChange = (e) => {
        if (e.target.type === 'number') {
            // TODO implement sum of items count
            setItemsCount(x => x = Number(e.target.value));
        }

        // if (e.target.type === 'checkbox' && e.target.value === 'on') {
        //     alert(e.target.value);
        // }
    }

    const getAddedItemsInCart = async () => {
        await shoppingCartService.getItemsInCart(currentUser.uid)
            .then((id) => setItemsId(id));
    }

    const getAddedItemsInCartById = async () => {
        await itemsService.getItemsByIds(itemsId)
            .then((items) => setItemsInCart(items));
    }

    useEffect(() => {
        getAddedItemsInCart();
        getAddedItemsInCartById();
    }, []);

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
                                    <Link to="/items/:itemId">
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