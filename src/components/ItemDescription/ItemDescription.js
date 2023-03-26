import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import * as itemsService from '../../services/itemsService';
import './ItemDescription.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export const ItemDescription = () => {
    const [item, setItem] = useState({});
    const { itemId } = useParams();

    useEffect(() => {
        itemsService.getItem(itemId)
            .then((item) => setItem(item));
    }, [])

    return (
        <div className="container">
            <h1>{item.type} "{item.name}"</h1>
            <div className="item">
                <img className="item__image" src={item.imageUrl} alt="jewellery" />
                <div className="item__description">
                    <div className="details">
                        <h2>Категория</h2>
                        <p>{item.categoryName}</p>
                        <h2>Материал</h2>
                        <p>{item.material}</p>
                        <h2>Описание</h2>
                        <p>{item.description}</p>
                        {item.discount > 0
                            ? <>
                                <h2>Цена</h2>
                                <p><s>{item.price}</s> лв.</p>
                                <p>{item.price - item.discount} лв.</p>
                                <h2>Отстъпка</h2>
                                <p>{`${((item.discount / item.price) * 100).toFixed(0)} %`}</p>
                            </>
                            : <>
                                <h2>Цена</h2>
                                <p>{item.price} лв.</p>
                            </>
                        }
                        <h2>Наличност</h2>
                        <p>{item.quantity} бр.</p>
                    </div>

                    <div className="add-cart">
                        <div>
                            <h2>Количество</h2>
                            <input type="number" min="1" defaultValue={1} />
                        </div>
                        <Link className="button yellow same-size" to="">
                            <FontAwesomeIcon icon={solid('cart-shopping')} className="fa-icon" />Добави в количката
                        </Link>
                    </div>

                    <div className="favourites">
                        <h2>Харесва ли ти?</h2>
                        <Link className="button purple same-size" to="">
                            <FontAwesomeIcon icon={solid('heart')} className="fa-icon" />
                            Добави в любими
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}