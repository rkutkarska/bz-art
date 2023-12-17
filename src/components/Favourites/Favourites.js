import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { ModalTemplate } from "../Modals/ModalTemplate";

import * as usersItemsService from '../../services/usersItemsService';
import * as itemsService from '../../services/itemsService';
import styles from './Favourites.module.css';

export const Favourites = () => {

    const [userItems, setUserItems] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const { currentUser } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalObject, setModalObject] = useState({});

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
            {isModalOpen ? <ModalTemplate obj={{ modalObject, setIsModalOpen }} /> : false}

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
                                                <FontAwesomeIcon
                                                    onClick={(e) => {
                                                        usersItemsService
                                                            .addToCart(e, currentUser.uid, item.id, 1)
                                                            .then(() => {
                                                                usersItemsService.removeItemFromFavourites(item.id, currentUser.uid, favourites, setFavourites);
                                                                setModalObject({ message: 'Артикулът е преместен в количката!', type: 'cart' });
                                                                setIsModalOpen(true);
                                                            })
                                                    }}

                                                    icon={solid('shopping-cart')}
                                                    className={`fa-icon ${styles["cart"]}`}
                                                />
                                                <p className={styles['hidden-text__cart']}>Премести в количката</p>
                                            </button>
                                            <button>
                                                <FontAwesomeIcon
                                                    onClick={() => usersItemsService.removeItemFromFavourites(item.id, currentUser.uid, favourites, setFavourites)}
                                                    icon={solid('trash-can')}
                                                    className={`fa-icon ${styles.trash}`}
                                                />
                                                <p className={styles['hidden-text__trash']}>Премахни</p>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }

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