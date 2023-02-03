import React, { useEffect } from "react";
import { useState } from "react";
import { v4 } from "uuid";
import { storage, db } from "../Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import "../styles/CreateItem.css";

export const CreateItem = () => {
    const initialFormData = Object.freeze({
        'name': '',
        'type': '',
        'category': '',
        'material': '',
        'description': '',
        'price': 0,
        'discount': 0,
        'url': '',
        'pin-new': "off",
        'pin-discount': "off",
        'dateCreated': {}
    });

    const [formData, updateFormData] = useState(initialFormData);
    const [imageUpload, setImageUpload] = useState('');
    const [categories, setCategories] = useState([]);
    const [materials, setMaterials] = useState([]);

    const fetchCategories = async () => {
        const categoriesCollectionRef = collection(db, "categories");

        await getDocs(categoriesCollectionRef)
            .then((res => {
                const data = res.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setCategories(data);
            }))
    }

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
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchMaterials();
    }, []);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
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
                const itemsCollectionRef = collection(db, `categories/${formData.category}/items`);
                addDoc(itemsCollectionRef, { ...formData, url, dateCreated: new Date() });
            });
        });
        e.target.reset();
    }

    const clearImage = (e) => {
        e.preventDefault();
        updateFormData({ ...formData, "url": "" });
        e.target.previousSibling.value = '';
    };

    // TODO implement drag and drop

    return (
        <div className="container">
            <div className="form-container">
                <h1>Добавяне на артикул</h1>
                <form onSubmit={saveItem} onChange={(e) => handleChange(e)} className="form">
                    <label htmlFor="name">Име</label>
                    <input type="text" name="name" placeholder="Име на артикул" required />
                    <label htmlFor="type">Вид</label>
                    <input type="text" name="type" placeholder="Вид артикул" required />
                    <label htmlFor="category">Категория</label>
                    <select name="category" defaultValue={'DEFAULT'} required>
                        <option value="DEFAULT" disabled={true}>-- Моля, изберете --</option>
                        {
                            categories.map((category) => (
                                <option value={category.id} key={category.id}>
                                    {category.category}
                                </option>
                            ))
                        }
                    </select>
                    <label htmlFor="material">Материал</label>
                    <select type="select" name="material" defaultValue={'DEFAULT'} required >
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
                    <textarea name="description" cols="30" rows="3" placeholder="Въведете описание"></textarea>
                    <div className="flex-items">
                        <div className="flex-items__item">
                            <label htmlFor="price">Цена</label>
                            <input type="number" step="0.01" min="0.00" name="price" placeholder="0.00" required />
                            <p>BGN</p>
                        </div>
                        <div className="flex-items__item">
                            <label htmlFor="discount">Намаление</label>
                            <input type="number" step="0.01" min="0.00" name="discount" placeholder="0.00" required />
                            <p>BGN</p>
                        </div>
                    </div>

                    <div className="form-check">
                        <label htmlFor="index-">Етикет начало:</label>
                        <div>
                            <input className="form-check-input" type="checkbox" name="pin-new" />
                            <label htmlFor="pin-new">Ново</label>
                        </div>

                        <div>
                            <input className="form-check-input" type="checkbox" name="pin-discount" />
                            <label htmlFor="pin-discount">Промоция</label>
                        </div>
                    </div>
                    <label htmlFor="image" className="drop-container">
                        <span className="drop-title">Провлачете снимка тук</span>
                        или
                        <div className="flex-items">
                            <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} id="images" accept="image/*" name="url" required />
                            <button className="button purple" onClick={(e) => clearImage(e)}><FontAwesomeIcon icon={solid('trash')} className="fa-icon" />Премахни</button>
                        </div>
                    </label>

                    <input type="submit" className="button yellow" value="Запиши" />
                </form>
            </div>
        </div>
    );
}