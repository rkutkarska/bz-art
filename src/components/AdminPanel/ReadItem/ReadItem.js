import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';

import { Spinner } from '../../Spinner/Spinner';
import { ModalTemplate } from "../../Modals/ModalTemplate";

import * as itemsService from '../../../services/itemsService';
import styles from './ReadItem.module.css';

export const ReadItem = () => {
    const [item, setItem] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalObject, setModalObject] = useState({});

    const { itemId } = useParams();

    useEffect(() => {
        itemsService.getItem(itemId, setIsModalOpen, setModalObject)
            .then((item) => {
                setItem(item)
                setIsLoading(false);
            });
    }, [])

    return (
        <div className={`${styles.read} container`}>
            {
                isLoading
                    ? <Spinner />
                    : <div className="form-container">

                        {isModalOpen ? <ModalTemplate obj={{ modalObject, setIsModalOpen }} /> : false}

                        <h1>Преглед на артикул</h1>
                        <p className="date-created">Записът е създаден на: {item.dateCreated.toDate().toLocaleString("bg-BG", { dateStyle: 'long', timeStyle: "short" })}</p>
                        <form className="form">
                            <label>Име</label>
                            <input defaultValue={item.name} type="text" disabled />
                            <label>Вид</label>
                            <input defaultValue={item.type} type="text" disabled />
                            <label htmlFor="material">Материал</label>
                            <input defaultValue={item.materialName} type="text" disabled />
                            <label>Описание</label>
                            <textarea defaultValue={item.description} cols="30" rows="3" disabled />
                            <div className="flex-items">
                                <div className="flex-items__item">
                                    <label>Количество</label>
                                    <input defaultValue={item.quantity} type="number" disabled />
                                    <p>бр.</p>
                                </div>
                                <div className="flex-items__item">
                                    <label htmlFor="price">Цена</label>
                                    <input defaultValue={item.price} type="number" disabled />
                                    <p>BGN</p>
                                </div>
                                <div className="flex-items__item">
                                    <label>Намаление</label>
                                    <input defaultValue={item.discount} type="number" disabled />
                                    <p>BGN</p>
                                </div>
                            </div>

                            <div className="form-check">
                                <label htmlFor="index-label">Етикет:</label>
                                <div>
                                    <input defaultChecked={item.isNew} className="form-check-input" type="checkbox" disabled />
                                    <label htmlFor="isNew">Ново</label>
                                </div>

                                <div>
                                    <input defaultChecked={item.hasDiscount} className="form-check-input" type="checkbox" disabled />
                                    <label htmlFor="hasDiscount">Промоция</label>
                                </div>

                                <div>
                                    <input defaultChecked={item.isPinnedToHome} className="form-check-input" type="checkbox" disabled />
                                    <label htmlFor="isPinnedToHome">Закачи в начало</label>
                                </div>

                            </div>
                            <label>Снимка:</label>
                            <img className={styles.image__preview} src={item.imageUrl} alt={item.name} />
                            <Link to="/admin-panel" className="button red">Затвори</Link>
                        </form>
                    </div>
            }
        </div>
    )
}