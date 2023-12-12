import { useEffect, useState } from "react";
import { getCurrentPromoItems } from "../../../services/itemsService"
import { ItemActionButtons } from "../../Items/ItemActionButtons/ItemActionButtons";
import { Spinner } from "../../Spinner/Spinner";

import styles from './CurrentPromotion.module.css';

export const CurrentPromotion = () => {
    const [promoItems, setPromoItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentPromoItems()
            .then(result => {
                if (result) {
                    setPromoItems(result.docs.map(item => ({ ...item.data(), id: item.id })));
                    setIsLoading(false);
                }
            })
    }, [])

    let itemsList = [];

    for (var i = 0; i < promoItems.length; i += 3) {
        itemsList.push(
            <div key={'items' + i} className={styles["row-items"]}>
                {
                    promoItems.filter(x => (x.discount / x.price) * 100 >= 50).slice(i, i + 3).map(item => (
                        (item.quantity > 0)
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
                                            || (item.hasDiscount && <div className="discount-tag">{`- ${((item.discount / item.price) * 100).toFixed(0)} %`}</div>)
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
            <h1 className="caption">Текуща промоция</h1>
            {
                isLoading
                    ? <Spinner />
                    : <>
                        <article className={styles.items}>
                            {
                                itemsList.length > 0
                                    ? itemsList
                                    : <h2 className="no-items">Няма добавени артикули!</h2>
                            }
                        </article>
                    </>
            }
        </div>
    );
}