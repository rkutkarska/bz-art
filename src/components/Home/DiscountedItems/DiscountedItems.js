import { useEffect, useState } from "react";
import { DiscountedItem } from "./DiscountedItem";

import * as itemsService from '../../../services/itemsService';
import styles from './DiscountedItems.module.css';

export const DiscountedItems = () => {

    const [discountedItems, setDiscountedItems] = useState([]);

    useEffect(() => {
        itemsService.getDiscountedItems()
            .then((items) => { setDiscountedItems(items) });
    }, []);

    return (
        <article className={styles.discounted}>
            <h1 className="caption">Намаления</h1>
            {
                (discountedItems.some((x) => x.isPinnedToHome == true))
                    ? <DiscountedItem items={discountedItems} />
                    : <p className={styles["no-discounted-items"]}>Няма намалени артикули!</p>
            }
        </article>
    );
}