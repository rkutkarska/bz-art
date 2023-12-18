import { Link } from 'react-router-dom';
import { ItemActionButtons } from '../../Items/ItemActionButtons/ItemActionButtons';
import styles from './NewItems.module.css';

export const NewItem = ({ items }) => {
    let newItemsList = [];

    for (let i = 0; i < items.length; i += 3) {
        newItemsList.push(
            <div key={'new' + i} className={`${styles.new__items} new__items`}>
                {
                    items.filter(x => x.quantity > 0 && x.isPinnedToHome).slice(i, i + 3).map(item => (
                        <section key={item.id} className={`${styles.new__item} new__item`}>
                            <Link to={`/items/${item.id}`}><img src={item.imageUrl} alt="ring" /></Link>
                            <div className={styles.new__actions}>
                                <div className={styles.new__description}>
                                    <p className={styles["item-name"]}>{item.name}</p>
                                    <p className={styles["item-price"]}>{item.price} лв.</p>
                                </div>
                                <div className={styles.new__tags}>
                                    <div className="new-tag">НОВО</div>
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
            {newItemsList}
        </>
    )
}