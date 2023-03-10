import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as itemsService from '../../services/itemsService';
import styles from './ListItems.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export const ListItems = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        itemsService.getAllItems()
            .then((data) => setItems(data));
    }, [])

    let itemsList = [];

    for (var i = 0; i < items.length; i += 3) {
        itemsList.push(
            <div key={'items' + i} className={styles["row-items"]}>
                {
                    items.slice(i, i + 3).map(item => (
                        <section key={item.id} className={styles.items__item}>
                            <img src={item.imageUrl} alt={item.type} />
                            <div className="item__actions">
                                <div className={styles.item__description}>
                                    <p className={styles["item-name"]}>{item.name}</p>
                                    <p className={styles["item-price"]}>{item.price} лв.</p>
                                </div>
                                <div className={styles.item__tags}>
                                    {
                                        (item.isNew && <div className={styles["new-tag"]}>НОВО</div>)
                                        || (item.hasDiscount && <div className="discount-tag">{`- ${((item.discount / item.price) * 100).toFixed(0)} %`}</div>)
                                    }
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
        <div className="container">
            <h1 className="caption">Артикули</h1>
            <article className={styles.items}>
                {itemsList.length > 0
                    ? itemsList
                    : <p className="no-items">Няма добавени артикули!</p>
                }
            </article>
        </div>
    );
}