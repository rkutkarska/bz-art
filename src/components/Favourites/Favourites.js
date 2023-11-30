import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import * as usersItemsService from '../../services/usersItemsService';
import * as itemsService from '../../services/itemsService';

import styles from './Favourites.module.css';

export const Favourites = () => {

    const [userItems, setUserItems] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [itemsInFavourites, setItemsInFavourites] = useState([]);
    const { currentUser } = useAuth()

    useEffect(() => {
        usersItemsService.getFavourites(currentUser.uid)
            .then(items => {
                setUserItems(items);
            })
    }, []);

    useEffect(() => {
        if (true) {
            let ids = userItems.map(x => x.id);

            itemsService.getItemsByIds(ids)
                .then((res) => {
                    let items = [];
                    res.map(item => {
                        items.push(item);
                    });
                    setFavourites(items);
                });

        }
    }, [userItems])


    return (<>
        <div className={`container ${styles.favourites}`}>
            <h1>Любими артикули</h1>
            {
                favourites.length > 0
                    ? <div className={styles.favourites__content}>
                        <div className={styles.favourites__items}>
                            {
                                favourites.map(item => (
                                    <div key={item.id} className={styles.favourites__item}>
                                        <img src={item.imageUrl} alt={item.name} />
                                        <div className={styles.item__description}>
                                            <Link to={`/items/${item.id}`}>
                                                <p>{item.type} {item.name}</p>
                                            </Link>
                                            <h2>{(item.price).toFixed(2)} лв.</h2>
                                            <h2>Наличност: {item.quantity} бр.</h2>
                                        </div >
                                        <div className={styles.item__actions}>
                                            <button>
                                                <FontAwesomeIcon icon={solid('shopping-cart')} className={`fa-icon ${styles["solid-cart"]}`} />
                                            </button>
                                            <button>
                                                <FontAwesomeIcon
                                                    onClick={() => usersItemsService.removeItemFromFavourites(item.id, currentUser.uid, itemsInFavourites, setItemsInFavourites)}
                                                    icon={solid('trash-can')}
                                                    className={`fa-icon ${styles.trash}`}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                        <div className={styles.favourites__similar}>
                            <h2>Също може да ти хареса:</h2>

                        </div>
                    </div>
                    : <div className={styles.favourites__empty}>
                        <h2>Списъкът ти с любими е празен!</h2>
                        <Link to="/items" className="button purple">Към артикулите</Link>
                    </div>
            }
        </div>
    </>
    );
}