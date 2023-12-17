import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { ModalTemplate } from "../Modals/ModalTemplate";

import * as usersItemsService from '../../services/usersItemsService';
import * as itemsService from '../../services/itemsService';

import styles from './ShoppingCart.module.css';

export const ShoppingCart = () => {
    const totalSum = useRef(0);
    const itemsCount = useRef(0);

    const [userItems, setUserItems] = useState([]);
    const [itemsInCart, setItemsInCart] = useState([]);
    const { currentUser } = useAuth();

    const isInsufficientQty = useRef(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalObject, setModalObject] = useState({});

    let orderId = '';

    const navigate = useNavigate();

    const changeAmount = (item) => {
        if (item.availableQuantity > parseInt(item.event.target.value)) {
            usersItemsService
                .updateCartItem(currentUser.uid, item.id, item.event.target.value)
                .then(() => {
                    itemsCount.current = 0;
                    totalSum.current = 0;
                    usersItemsService.getItemsInCart(currentUser.uid)
                        .then(items => {
                            setUserItems(items);
                        })
                });
        }
    }

    const placeOrder = () => {
        usersItemsService
            .orderItems(currentUser.uid, itemsInCart, totalSum.current, setItemsInCart)
            .then((res) => orderId = res)
            .then(() => navigate(`/successful-order/${orderId}`));
    }

    useEffect(() => {
        usersItemsService.getItemsInCart(currentUser.uid)
            .then(items => {
                setUserItems(items);
            })
    }, []);

    useEffect(() => {
        let ids = userItems.map(x => x.id);

        itemsService.getItemsByIds(ids)
            .then((res) => {
                let items = [];
                res.map(item => {
                    item.desiredQuantity = userItems.find(x => x.id === item.id).quantity;
                    totalSum.current = Number((totalSum.current + ((item.price - item.discount) * item.desiredQuantity)));
                    itemsCount.current = itemsCount.current + 1;
                    items.push(item);
                });
                setItemsInCart(items);
            });

    }, [userItems])

    const handleChange = (e, itemQuantity, itemId) => {

        let index = itemsInCart.findIndex((x) => x.id == itemId);
        let arr = itemsInCart;

        if (Number(e.target.value) > Number(itemQuantity)) {
            arr[index].quantityError = true;

            isInsufficientQty.current = true;
            return setItemsInCart([...arr]);
        }

        if (e.target.value === '' || Number(e.target.value) <= 0) {
            arr[index].invalidError = true;

            isInsufficientQty.current = true;
            return setItemsInCart([...arr]);
        }

        arr[index].quantityError = false;
        arr[index].invalidError = false;
        changeAmount({ "id": itemId, "event": e, 'availableQuantity': itemQuantity })

        if (itemsInCart.some((x) => (x.quantityError == true) || (x.invalidError == true))) {
            isInsufficientQty.current = true;
            return setItemsInCart([...arr]);
        }

        isInsufficientQty.current = false;
        return setItemsInCart([...arr]);
    }

    return (<>
        <div className={`container ${styles.cart}`}>

            {isModalOpen ? <ModalTemplate obj={{ modalObject, setIsModalOpen }} /> : false}

            <h1>Артикули добавени в количката</h1>
            {
                itemsInCart.length > 0
                    ? <div className={styles.cart__content}>
                        <div className={styles.cart__items}>
                            {
                                itemsInCart.map(item => (
                                    <div key={item.id} className={styles.cart__item}>
                                        <img src={item.imageUrl} alt={item.name} />
                                        <div className={styles.item__description}>
                                            <Link to={`/items/${item.id}`}>
                                                <p>{item.type} {item.name}</p>
                                            </Link>
                                            <h2>{(item.price - item.discount).toFixed(2)} лв.</h2>
                                            <h2>Наличност: {item.quantity} бр.</h2>
                                        </div >
                                        {
                                            <>
                                                <input
                                                    type="number"
                                                    defaultValue={item.desiredQuantity}
                                                    min={1}
                                                    max={item.quantity}
                                                    onChange={(e) => handleChange(e, item.quantity, item.id)}
                                                />

                                                {(item.quantityError) && <p key={item.id} className={`form-error ${styles.error}`}>Недостатъчна наличност!</p>}
                                                {(item.invalidError) && <p key={item.id} className={`form-error ${styles.error}`}>Невалидна стойност!</p>}
                                            </>
                                        }
                                        <div className={styles.item__actions}>
                                            <button>
                                                <FontAwesomeIcon
                                                    onClick={() => {
                                                        usersItemsService.addToFavorites(currentUser.uid, item.id)
                                                            .then(() => {
                                                                setModalObject({ message: 'Артикулът е добавен в любими!', type: 'favourites' });
                                                                setIsModalOpen(true);
                                                            })
                                                    }}
                                                    icon={solid('heart')} className={`fa-icon ${styles["heart"]}`} />
                                                <p className={styles['hidden-text__heart']}>Добави в любими</p>
                                            </button>
                                            <button>
                                                <FontAwesomeIcon
                                                    onClick={async () => {
                                                        await usersItemsService
                                                            .removeItemFromCart(item.id, currentUser.uid, itemsInCart, setItemsInCart)
                                                            .then(() => {
                                                                totalSum.current = 0;
                                                                usersItemsService.getItemsInCart(currentUser.uid)
                                                                    .then(items => {
                                                                        setUserItems(items);
                                                                    })
                                                            })
                                                    }}

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
                        <div className={styles.cart__summary}>
                            <h2>Общо:</h2>
                            <p className={styles.summary__count}>{userItems.length} артикула</p>
                            <p className={styles.summary__price}>{totalSum.current.toFixed(2)} лева</p>
                            <button className="button green" onClick={placeOrder} disabled={isInsufficientQty.current}>Поръчай</button>
                        </div>
                    </div>
                    :
                    <div className={styles.cart__empty}>
                        <h2>Количката ти е празна!</h2>
                        <Link to="/items" className="button purple">Към артикулите</Link>
                    </div>
            }
        </div>
    </>
    );
}