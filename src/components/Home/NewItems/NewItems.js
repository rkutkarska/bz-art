import React from "react";
import styles from '../../../styles/NewItems.css';

export const NewItems = () => {

    return (
        <article className="new">
            <h1 className="caption">Ново</h1>
            <div className="new__items">
                <section className="new__item">
                    <img src="/src/items/item_jewellery-2.jpg" alt="ring" />
                        <div className="new__actions">
                            <div className="new__description">
                                <p className="item-name">Infinissima</p>
                                <p className="item-price">32 лв.</p>
                            </div>
                            <div className="buttons">
                                <a className="button purple" href=""><i className="fa-solid fa-eye"></i>Детайли</a>
                                <a className="button yellow" href=""><i className="fa-solid fa-cart-shopping"></i>Добави</a>
                            </div>
                        </div>
                </section>
            </div>
        </article>
    );
}