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
        'category': '',
        'material': '',
        'description': '',
        'price': 0,
        'discount': 0,
        'url': '',
        'is-new': false,
        'has-discount': false
    });

    const [formData, updateFormData] = useState(initialFormData);
    const [imageUpload, setImageUpload] = useState(null);
    const [categories, setCategories] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [isNew, setIsNew] = useState(false);
    const [hasDiscount, setHasDiscount] = useState(false);

    const itemsCollectionRef = collection(db, "items");

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

    useEffect(() => {
        updateFormData({
            ...formData,
            'is-new': isNew
        });
    }, [isNew]);

    useEffect(() => {
        updateFormData({
            ...formData,
            'has-discount': hasDiscount
        });
    }, [hasDiscount]);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
        // console.log({ ...formData });
    }

    const isNewChange = () => {
        setIsNew(current => !current);
    }

    const hasDiscountChange = () => {
        setHasDiscount(current => !current);
    }

    const saveItem = async (e) => {
        e.preventDefault();

        const imageRef = ref(storage, `images/items/${v4() + imageUpload.name}`);

        if (imageUpload == null) {
            // alert('Неуспешно качване!');
            return;
        }

        await uploadBytes(imageRef, imageUpload).then(() => {
            // alert('Файлът е качен успешно!');
            getDownloadURL(imageRef).then((url) => {
                addDoc(itemsCollectionRef, { ...formData, url });
                // let category = formData.category;
                // addDoc(categoriesCollectionRef, { cat: category });
            });
        });
        // clear form after submit
        e.target.reset();
    }

    const clearImage = (e) => {
        updateFormData({ ...formData, "url": "" })
        e.target.value = null;
    };

    // TODO implement drag and drop

    return (
        <div className="container">
            <div className="form-container">
                <h1>Добавяне на артикул</h1>
                <form onSubmit={saveItem} onChange={(e) => handleChange(e)} className="form">
                    <label htmlFor="name">Име</label>
                    <input type="text" name="name" />
                    <label htmlFor="category">Категория</label>
                    <select name="category" defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled={true}>-- Моля изберете --</option>
                        {
                            categories.map((category) => (
                                <option value={category.category} key={category.id}>
                                    {category.category}
                                </option>
                            ))
                        }
                    </select>
                    <label htmlFor="material">Материал</label>
                    <select type="select" name="material" defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled={true}>-- Моля изберете --</option>
                        {
                            materials.map((material) => (
                                <option value={material.material} key={material.id}>
                                    {material.material}
                                </option>
                            ))
                        }
                    </select>
                    <label htmlFor="description">Описание</label>
                    <textarea name="description" cols="30" rows="3"></textarea>
                    <div className="flex-items">
                        <div className="flex-items__item">
                            <label htmlFor="price">Цена</label>
                            <input type="number" name="price" />
                            <p>BGN</p>
                        </div>
                        <div className="flex-items__item">
                            <label htmlFor="discount">Намаление</label>
                            <input type="number" name="discount" />
                            <p>BGN</p>
                        </div>
                    </div>

                    <div className="form-check">
                        <label htmlFor="index-">Етикет начало:</label>
                        <div>
                            <input className="form-check-input" type="checkbox" name="is-new" onClick={(e) => isNewChange(e)} />
                            <label htmlFor="is-new">Ново</label>
                        </div>

                        <div>
                            <input className="form-check-input" type="checkbox" name="has-discount" value={hasDiscount} onClick={hasDiscountChange} />
                            <label htmlFor="has-discount">Промоция</label>
                        </div>
                    </div>

                    <label htmlFor="images" className="drop-container">
                        <span className="drop-title">Провлачете снимка тук</span>
                        или
                        <div className="flex-items">
                            <input type="file" onChange={(e) => { setImageUpload(e.target.files[0]) }} id="images" accept="image/*" name="url" required />
                            <button className="button purple" onClick={(e) => clearImage(e)}><FontAwesomeIcon icon={solid('trash')} className="fa-icon" />Премахни</button>
                        </div>
                    </label>

                    <input type="submit" className="button yellow" value="Запиши" />
                </form>
            </div>
        </div>
    );
}