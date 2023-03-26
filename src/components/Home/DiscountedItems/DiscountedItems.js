import React, { useEffect, useState } from "react";
import './DiscountedItems.css';
import * as itemsService from '../../../services/itemsService';
import { DiscountedItem } from "./DiscountedItem";

export const DiscountedItems = () => {

    const [discountedItems, setDiscountedItems] = useState([]);

    useEffect(() => {
        itemsService.getDiscountedItems()
            .then((items) => { setDiscountedItems(items) });
    }, []);

    return (
        <article className="discounted">
            <h1 className="caption">Намаления</h1>
                {discountedItems.length > 0
                    ? <DiscountedItem items={discountedItems} />
                    : <p className="no-discounted-items">Няма намалени артикули!</p>
                }
        </article>
    );
}