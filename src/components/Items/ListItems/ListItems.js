import { useEffect, useState } from "react";
import { ItemActionButtons } from '../ItemActionButtons/ItemActionButtons';
import { Spinner } from '../../Spinner/Spinner';

import styles from './ListItems.module.css';
import * as itemsService from '../../../services/itemsService';

export const ListItems = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    let itemsList = [];

    useEffect(() => {
        itemsService.getAllItems()
            .then((data) => {
                setItems(data);
                setIsLoading(false);
            });
    }, [])


    for (var i = 0; i < items.length; i += 3) {
        itemsList.push(
            <div key={'items' + i} className={styles["row-items"]}>
                {
                    items.slice(i, i + 3).map(item => (
                        item.quantity > 0
                            ? <section key={item.id} className={styles.items__item}>
                                <img src={item.imageUrl} alt={item.type} />
                                <div className="item__actions">
                                    <div className={styles.item__description}>
                                        <p className={styles["item-name"]}>{item.name}</p>
                                        <p className={styles["item-price"]}>{item.price} лв.</p>
                                    </div>
                                    <div className={styles.item__tags}>
                                        {
                                            (item.isNew && <div className={styles["new-tag"]}>НОВО</div>)
                                            || (((item.hasDiscount) && (item.discount > 0)) && <div className="discount-tag">{`- ${((item.discount / item.price) * 100).toFixed(0)} %`}</div>)
                                        }
                                    </div>
                                    <ItemActionButtons props={{ 'item': item, 'quantity': 1 }} />
                                </div>
                            </section >
                            : <section key={item.id} className={styles.items__item}>
                                <img src={item.imageUrl} alt={item.type} />
                                <div className="item__actions">
                                    <div className={styles.item__description}>
                                        <p className={styles["item-name"]}>{item.name}</p>
                                        <p className={styles["item-price"]}>{item.price} лв.</p>
                                    </div>
                                </div>
                                <h2 className="out-of-stock">Изчерпан!</h2>
                            </section >
                    ))
                }
            </div>
        );
    }

    return (
        <div className="container">
            <h1 className="caption">Артикули</h1>
            {
                isLoading
                    ? <Spinner />
                    : <>
                        <article className={styles.items}>
                            {
                                itemsList.length > 0
                                    ? itemsList
                                    : <p className="no-items">Няма добавени артикули!</p>
                            }
                        </article>
                    </>
            }
        </div>
    );
}