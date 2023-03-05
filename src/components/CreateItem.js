import React, { useEffect, useState } from "react";

import { collection, addDoc, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { db } from "../Firebase";

import * as itemsService from '../services/itemsService';

import "../styles/CreateItem.css";
import { CreateCategory } from "./CreateCategory";
import { ModalTemplate } from "./Modals/ModalTemplate";

export const CreateItem = () => {

    const [itemsData, updateItemsData] = useState({
        name: '',
        type: '',
        categoryName: '',
        material: '',
        description: '',
        price: 0,
        discount: 0,
        imageUrl: '',
        isNew: false,
        hasDiscount: false,
        dateCreated: {}
    });

    const [itemImageUpload, setItemImageUpload] = useState('');
    const [materials, setMaterials] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalObject, setModalObject] = useState({});

    const fetchMaterials = async () => {
        const materialsCollectionRef = collection(db, "materials");

        await getDocs(materialsCollectionRef)
            .then((res => {
                const data = res.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setMaterials(data);
            }))
    }

    useEffect(() => {
        fetchMaterials();
    }, []);

    const handleChange = (e) => {
        let objValue;

        if (e.target.type === 'checkbox') {
            objValue = e.target.checked;
        } else if (e.target.type === 'number') {
            objValue = Number(e.target.value.trim());
        } else {
            objValue = e.target.value.trim();
        }

        updateItemsData({
            ...itemsData,
            [e.target.name]: objValue
        })
    }

    useEffect(() => {
        if (isModalOpen) {
            document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        } else {
            document.getElementsByTagName('body')[0].style.overflow = 'scroll';
        }
    }, [isModalOpen]);

    const clearImage = (e) => {
        e.preventDefault();
        updateItemsData({ ...itemsData, imageUrl: '' });
        e.target.previousSibling.value = '';
    };


    // TODO implement drag and drop

    return (
        <div className="container">
            {isModalOpen ? <ModalTemplate obj={modalObject} /> : false}
            {/* <ModalTemplate obj={{ message: 'Съобщение', type: "information" }} /> */}

            <div className="form-container">
                <h1>Добавяне на артикул</h1>
                <form
                    onSubmit={(e) => itemsService.saveItem(e, itemImageUpload, itemsData, setIsModalOpen, setModalObject)}
                    onChange={handleChange}
                    className="form"
                >
                    <label htmlFor="name">Име</label>
                    <input id="name" type="text" name="name" placeholder="Име на артикул" required />
                    <label htmlFor="type">Вид</label>
                    <input id="type" type="text" name="type" placeholder="Вид артикул" required />

                    <CreateCategory />

                    <label htmlFor="material">Материал</label>
                    <select id="material" type="select" name="material" defaultValue={'DEFAULT'} required >
                        <option value="DEFAULT" disabled={true}>-- Моля, изберете --</option>
                        {
                            materials.map((material) => (
                                <option value={material.material} key={material.id}>
                                    {material.material}
                                </option>
                            ))
                        }
                    </select>
                    <label htmlFor="description">Описание</label>
                    <textarea id="description" name="description" cols="30" rows="3" placeholder="Въведете описание" />
                    <div className="flex-items">
                        <div className="flex-items__item">
                            <label htmlFor="price">Цена</label>
                            <input id="price" type="number" step="0.01" min="0.00" name="price" placeholder="0.00" required />
                            <p>BGN</p>
                        </div>
                        <div className="flex-items__item">
                            <label htmlFor="discount">Намаление</label>
                            <input id="discount" type="number" step="0.01" min="0.00" name="discount" placeholder="0.00" />
                            <p>BGN</p>
                        </div>
                    </div>

                    <div className="form-check">
                        <label htmlFor="index-label">Етикет начало:</label>
                        <div>
                            <input id="isNew" className="form-check-input" type="checkbox" name="isNew" value={itemsData.isNew} />
                            <label htmlFor="isNew">Ново</label>
                        </div>

                        <div>
                            <input id="hasDiscount" className="form-check-input" type="checkbox" name="hasDiscount" value={itemsData.hasDiscount} />
                            <label htmlFor="hasDiscount">Промоция</label>
                        </div>
                    </div>
                    <label htmlFor="image" className="drop-container">
                        <span className="drop-title">Провлачете снимка тук</span>
                        или
                        <div className="flex-items">
                            <input type="file" onChange={(e) => setItemImageUpload(e.target.files[0])} id="images" accept="image/*" name="imageUrl" required />
                            <button className="button red" onClick={clearImage}><FontAwesomeIcon icon={solid('trash')} className="fa-icon" />Премахни</button>
                        </div>
                    </label>

                    <input type="submit" className="button green" value="Запиши" />
                </form>
            </div>
        </div>
    );
}