import { useEffect, useState } from "react";
import { NewItem } from "./NewItem";
import * as itemsService from '../../../services/itemsService';
import styles from './NewItems.module.css';

export const NewItems = () => {
    const [newItems, setNewItems] = useState([]);

    useEffect(() => {
        itemsService.getNewItems()
            .then((items) => setNewItems(items));
    }, []);

    return (
        <article className={styles.new}>
            <h1 className="caption">Ново</h1>
            {

                (newItems.some((x) => x.isPinnedToHome == true))
                    ? <NewItem items={newItems} />
                    : <p className={styles["no-new-items"]}>Няма нови артикули!</p>
            }
        </article>
    );
}