import React, { useEffect } from "react";
import { useState } from "react";
import { v4 } from "uuid";
import { storage, db } from "../Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import "../styles/CreateItem.css";
import { CreateCategory } from "./CreateCategory";

export const CreateItem = () => {

    const [formData, updateFormData] = useState({
        name: '',
        type: '',
        category: '',
        material: '',
        description: '',
        price: 0,
        discount: 0,
        url: '',
        isNew: false,
        hasDiscount: false,
        dateCreated: {}
    });

    const [imageUpload, setImageUpload] = useState('');
    const [materials, setMaterials] = useState([]);

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
        updateFormData({
            ...formData,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value.trim()
        })
    }

    const saveItem = async (e) => {
        e.preventDefault();
        const imageRef = ref(storage, `images/items/${v4() + imageUpload.name}`);

        if (imageUpload === '') {
            // alert('Неуспешно качване!');
            e.target.value = '';
            return;
        }

        await uploadBytes(imageRef, imageUpload).then(() => {
            // alert('Файлът е качен успешно!');
            getDownloadURL(imageRef).then((url) => {
                const itemsCollectionRef = collection(db, 'items');
                addDoc(itemsCollectionRef, { ...formData, url, dateCreated: new Date() });
            });
        });
        console.log(formData);
        e.target.reset();
    }

    const clearImage = (e) => {
        e.preventDefault();
        updateFormData({ ...formData, url: '' });
        e.target.previousSibling.value = '';
    };


    // TODO implement drag and drop

    return (
        <div className="container">
            <div className="form-container">
                <h1>Добавяне на артикул</h1>
                <form onSubmit={saveItem} onChange={handleChange} className="form">
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
                            <input id="isNew" className="form-check-input" type="checkbox" name="isNew" value={formData.isNew} />
                            <label htmlFor="isNew">Ново</label>
                        </div>

                        <div>
                            <input id="hasDiscount" className="form-check-input" type="checkbox" name="hasDiscount" value={formData.hasDiscount} />
                            <label htmlFor="hasDiscount">Промоция</label>
                        </div>
                    </div>
                    <label htmlFor="image" className="drop-container">
                        <span className="drop-title">Провлачете снимка тук</span>
                        или
                        <div className="flex-items">
                            <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} id="images" accept="image/*" name="url" required />
                            <button className="button purple" onClick={clearImage}><FontAwesomeIcon icon={solid('trash')} className="fa-icon" />Премахни</button>
                        </div>
                    </label>

                    <input type="submit" className="button yellow" value="Запиши" />
                </form>
            </div>
        </div>
    );
}