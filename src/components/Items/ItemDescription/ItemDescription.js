import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { useAuth } from '../../../context/AuthContext';
import { ModalTemplate } from "../../Modals/ModalTemplate";

import * as usersItemsService from "../../../services/usersItemsService";
import * as itemsService from '../../../services/itemsService';
import { getUserData } from '../../../services/usersService';

import styles from './ItemDescription.module.css'

export const ItemDescription = () => {
    const [item, setItem] = useState({});
    const [isInsufficientQty, setIsInsufficientQty] = useState(false);
    const [error, setError] = useState('');
    const [desiredQty, setDesiredQty] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalObject, setModalObject] = useState({});

    const { itemId } = useParams();
    const { currentUser } = useAuth();
    const navigate = useNavigate();


    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (currentUser) {
            getUserData(currentUser.uid)
                .then((res) => setUserData(res));
        }
    }, [])

    useEffect(() => {
        itemsService.getItem(itemId, setIsModalOpen, setModalObject)
            .then((item) => setItem(item));
    }, [])

    const handleChange = (e, itemQuantity) => {

        if (Number(e.target.value) > Number(itemQuantity)) {
            setIsInsufficientQty(true);
            setError('Недостатъчна наличност!');
        } else if (e.target.value === '' || e.target.value <= 0) {
            setIsInsufficientQty(true);
            setError('Невалидна стойност!')
        } else {
            setIsInsufficientQty(false);
            setError('');
            setDesiredQty(e.target.value);
        }
    }

    return (
        <div className="container">

            {isModalOpen ? <ModalTemplate obj={{ modalObject, setIsModalOpen }} /> : false}

            <h1>{item.type} "{item.name}"</h1>
            <div className={styles.item}>
                <img className={styles.item__image} src={item.imageUrl} alt="jewellery" />
                <div className={styles.item__description}>
                    <div className={styles.details}>
                        <h2>Категория</h2>
                        <p>{item.categoryName}</p>
                        <h2>Материал</h2>
                        <p>{item.materialName}</p>
                        <h2>Описание</h2>
                        <p>{item.description}</p>
                        {
                            item.discount > 0
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
                    {
                        (userData.role === 2)
                            ? <div className={styles.actions}>
                                <h2>Количество</h2>
                                <div className={styles["add-cart"]}>
                                    <div>
                                        <input
                                            type="number"
                                            min="1"
                                            step="1"
                                            max={item.quantity}
                                            onInput={(e) => e.target.value = (parseInt(e.target.value))}
                                            defaultValue={1}
                                            onChange={(e) => handleChange(e, item.quantity)}
                                        />
                                        {isInsufficientQty && <p className="form-error">{error}</p>}
                                    </div>
                                    {
                                        currentUser
                                            ? <button
                                                className="button yellow same-size-large"
                                                onClick={(e) =>
                                                    usersItemsService
                                                        .addToCart(e, currentUser.uid, itemId, desiredQty)
                                                        .then(() => {
                                                            setModalObject({ message: 'Артикулът е добавен в количката!', type: 'cart' });
                                                            setIsModalOpen(true);
                                                        })
                                                }
                                                disabled={isInsufficientQty}
                                            >
                                                <FontAwesomeIcon icon={solid('cart-shopping')} className="fa-icon" />Добави в количката
                                            </button>

                                            : <div className="tooltip-top">
                                                <button
                                                    className="button yellow same-size-large"
                                                    onClick={(e) => { navigate("/login") }}
                                                    disabled={isInsufficientQty}
                                                >
                                                    <FontAwesomeIcon icon={solid('cart-shopping')} className="fa-icon" />Добави в количката
                                                </button>
                                                <span className="tooltiptext">За поръчка е необходим акаунт. Кликни този бутон, за да се впишеш!</span>
                                            </div>
                                    }
                                </div>

                                <div className={styles.favourites}>
                                    <h2>Харесва ли ти?</h2>
                                    {
                                        currentUser
                                            ? <button className="button purple same-size-large"
                                                onClick={() =>
                                                    usersItemsService
                                                        .addToFavorites(currentUser.uid, itemId)
                                                        .then(() => {
                                                            setModalObject({ message: 'Артикулът е добавен в любими!', type: 'favourites' });
                                                            setIsModalOpen(true);
                                                        })
                                                }
                                            >
                                                <FontAwesomeIcon icon={solid('heart')} className="fa-icon" />
                                                Добави в любими
                                            </button>

                                            : <div className="tooltip-bottom">
                                                <button className="button purple same-size-large">
                                                    <FontAwesomeIcon icon={solid('heart')} className="fa-icon" />
                                                    Добави в любими
                                                </button>
                                                <span className="tooltiptext">За добавяне на артикул в любими е необходим акаунт. Кликни този бутон, за да се впишеш!</span>
                                            </div>
                                    }
                                </div>
                            </div>
                            : null
                    }
                </div>
            </div>
        </div >
    );
}