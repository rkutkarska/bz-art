import { Link } from 'react-router-dom';
import { ItemActionButtons } from '../../Items/ItemActionButtons/ItemActionButtons';
import styles from './DiscountedItems.module.css';

export const DiscountedItem = ({ items }) => {
    let discountedItemsList = [];

    for (let i = 0; i < items.length; i += 3) {
        discountedItemsList.push(
            <div key={'discounted' + i} className={`${styles.discounted__items} discounted__items`}>
                {
                    items.filter(x => x.quantity > 0 && x.isPinnedToHome).slice(i, i + 3).map(item => (
                        ((item.quantity > 0) && (item.isPinnedToHome)) &&
                        <section key={item.id} className={`${styles.discounted__item} discounted__item`}>
                            <Link to={`/items/${item.id}`}><img src={item.imageUrl} alt="ring" /></Link>
                            <div className={styles.discounted__actions}>
                                <div className={styles.discounted__description}>
                                    <p className={styles["item-name"]}>{item.name}</p>
                                    <p className={styles["item-price"]}>
                                        <s>{item.price}</s> лв.<br />
                                        <span className={styles["final-price"]}>{item.price - item.discount} лв.</span>
                                    </p>
                                </div>
                                <div className={styles.discounted__tag}>
                                    <div className="discount-tag">{`- ${((item.discount / item.price) * 100).toFixed(0)} %`}</div>
                                </div>
                                <ItemActionButtons props={{ 'item': item, 'quantity': 1 }} />
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