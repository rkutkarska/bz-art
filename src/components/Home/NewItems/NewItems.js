import React, { useEffect, useState } from "react";
import './NewItems.css';
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
            {newItems.length > 0
                ? <NewItem items={newItems} />
                : <p className="no-new-items">Няма нови артикули!</p>
            }
        </article>
    );
}