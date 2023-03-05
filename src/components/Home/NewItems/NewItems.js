import React, { useEffect, useState } from "react";
import styles from '../../../styles/NewItems.css';
import * as itemsService from '../../../services/itemsService';
import { NewItem } from "./NewItem";

export const NewItems = () => {
    const [newItems, setNewItems] = useState([]);

    useEffect(() => {
        itemsService.getNewItems()
            .then((items) => setNewItems(items));
    }, []);

    return (
        <article className="new">
            <h1 className="caption">Ново</h1>
            <div className="new__items">
                { newItems
                    ? <NewItem items={newItems} />
                    : <p className="no-new-items">Няма нови артикули!</p>
                }
            </div>
        </article>
    );
}