import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
// import {ItemCounter} from '../ItemCounter';

import styles from './ShoppingCart.module.css';

export const ShoppingCart = () => {
    const [itemsCount, setItemsCount] = useState(0);
    const handleChange = (e) => {
        if (e.target.type === 'number') {
            // TODO implement sum of items count
            setItemsCount(x => x = Number(e.target.value));
        }

        // if (e.target.type === 'checkbox' && e.target.value === 'on') {
        //     alert(e.target.value);
        // }
    }

    return (<>
        <div className={`container ${styles.cart}`}>
            <h1>Артикули добавени в количката</h1>
            <div className={styles.cart__content}>
                <div className={styles.cart__items} onChange={handleChange}>
                    <div className={styles.cart__item}>
                        <input type="checkbox" />
                        <img src="https://firebasestorage.googleapis.com/v0/b/bz-art.appspot.com/o/images%2Fitems%2F1cd354b6-d66f-4289-901b-47425f8d59d4item_jewellery-3.jpg?alt=media&token=832475af-3571-4622-a9f2-70dc276339e4" alt="" />
                        <div className={styles.item__description}>
                            <Link to="/items/:itemId">
                                <p>Пръстен Eve</p>
                            </Link>
                            <h2>150 лв.</h2>
                        </div>
                        <input defaultValue={1} type="number" min="1" max={10 /*TODO - quantity of item!*/} />
                        <div className={styles.item__actions}>
                            <button>
                                <FontAwesomeIcon icon={solid('heart')} className={`fa-icon ${styles["solid-heart"]}`} />
                            </button>
                            <button>
                                <FontAwesomeIcon icon={solid('trash-can')} className={`fa-icon ${styles.trash}`} />
                            </button>
                        </div>
                    </div>
                    <div className={styles.cart__item}>
                        <input type="checkbox" />
                        <img src="https://firebasestorage.googleapis.com/v0/b/bz-art.appspot.com/o/images%2Fitems%2F1cd354b6-d66f-4289-901b-47425f8d59d4item_jewellery-3.jpg?alt=media&token=832475af-3571-4622-a9f2-70dc276339e4" alt="" />
                        <div className={styles.item__description}>
                            <Link to="/items/:itemId">
                                <p>Пръстен Eve</p>
                            </Link>
                            <h2>150 лв.</h2>
                        </div>
                        <input defaultValue={1} type="number" min="1" max={10 /*TODO - quantity of item!*/} />
                        <div className={styles.item__actions}>
                            <button>
                                <FontAwesomeIcon icon={solid('heart')} className={`fa-icon ${styles["solid-heart"]}`} />
                            </button>
                            <button>
                                <FontAwesomeIcon icon={solid('trash-can')} className={`fa-icon ${styles.trash}`} />
                            </button>
                        </div>
                    </div>
                    <div className={styles.cart__item}>
                        <input type="checkbox" />
                        <img src="https://firebasestorage.googleapis.com/v0/b/bz-art.appspot.com/o/images%2Fitems%2F1cd354b6-d66f-4289-901b-47425f8d59d4item_jewellery-3.jpg?alt=media&token=832475af-3571-4622-a9f2-70dc276339e4" alt="" />
                        <div className={styles.item__description}>
                            <Link to="/items/:itemId">
                                <p>Пръстен Eve</p>
                            </Link>
                            <h2>150 лв.</h2>
                        </div>
                        <input defaultValue={1} type="number" min="1" max={10 /*TODO - quantity of item!*/} />
                        <div className={styles.item__actions}>
                            <button>
                                <FontAwesomeIcon icon={solid('heart')} className={`fa-icon ${styles["solid-heart"]}`} />
                            </button>
                            <button>
                                <FontAwesomeIcon icon={solid('trash-can')} className={`fa-icon ${styles.trash}`} />
                            </button>
                        </div>
                    </div>
                    <div className={styles.cart__item}>
                        <input type="checkbox" />
                        <img src="https://firebasestorage.googleapis.com/v0/b/bz-art.appspot.com/o/images%2Fitems%2F1cd354b6-d66f-4289-901b-47425f8d59d4item_jewellery-3.jpg?alt=media&token=832475af-3571-4622-a9f2-70dc276339e4" alt="" />
                        <div className={styles.item__description}>
                            <Link to="/items/:itemId">
                                <p>Пръстен Eve</p>
                            </Link>
                            <h2>150 лв.</h2>
                        </div>
                        <input defaultValue={1} type="number" min="1" max={10 /*TODO - quantity of item!*/} />
                        <div className={styles.item__actions}>
                            <button>
                                <FontAwesomeIcon icon={solid('heart')} className={`fa-icon ${styles["solid-heart"]}`} />
                            </button>
                            <button>
                                <FontAwesomeIcon icon={solid('trash-can')} className={`fa-icon ${styles.trash}`} />
                            </button>
                        </div>
                    </div>
                    <div className={styles.cart__item}>
                        <input type="checkbox" />
                        <img src="https://firebasestorage.googleapis.com/v0/b/bz-art.appspot.com/o/images%2Fitems%2F1cd354b6-d66f-4289-901b-47425f8d59d4item_jewellery-3.jpg?alt=media&token=832475af-3571-4622-a9f2-70dc276339e4" alt="" />
                        <div className={styles.item__description}>
                            <Link to="/items/:itemId">
                                <p>Пръстен Eve</p>
                            </Link>
                            <h2>150 лв.</h2>
                        </div>
                        <input defaultValue={1} type="number" min="1" max={10 /*TODO - quantity of item!*/} />
                        <div className={styles.item__actions}>
                            <button>
                                <FontAwesomeIcon icon={solid('heart')} className={`fa-icon ${styles["solid-heart"]}`} />
                            </button>
                            <button>
                                <FontAwesomeIcon icon={solid('trash-can')} className={`fa-icon ${styles.trash}`} />
                            </button>
                        </div>
                    </div>
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