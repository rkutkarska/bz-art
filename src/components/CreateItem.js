import React from "react";
import { useState } from "react";
import { storage, db } from "../Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { v4 } from "uuid";
import "../styles/CreateItem.css";

export const CreateItem = () => {

    const initialFormData = Object.freeze({
        'name': '',
        'category': '',
        'material': '',
        'description': '',
        'price': 0,
        'discount': 0,
        'url': ''
    });

    const [formData, updateFormData] = useState(initialFormData);
    const [imageUpload, setImageUpload] = useState(null);
    const itemCollectionRef = collection(db, "items");

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    }

    const saveItem = async (e) => {
        e.preventDefault();

        if (imageUpload == null) {
            // alert('Неуспешно качване!');
            return;
        }
        const imageRef = ref(storage, `images/items/${v4() + imageUpload.name}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            // alert('Файлът е качен успешно!');
            getDownloadURL(imageRef).then((url) => {
                addDoc(itemCollectionRef, { ...formData, url });
            });
        });


        // clear form after submit
        e.target.reset();
    };

    const clearImage = () => {
        setImageUpload(null);
    };

    return (
        <div className="container">
            <div className="form-container">
                <h1>Добавяне на продукт</h1>
                <form onSubmit={saveItem} className="form">
                    <label htmlFor="name">Име</label>
                    <input onChange={handleChange} type="text" name="name" />
                    <label htmlFor="category">Категория</label>
                    <select onChange={handleChange} name="category" defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled={true}>--Моля изберете --</option>
                        <option value="ring">Пръстен</option>
                        <option value="ring">Пръстен</option>
                        <option value="ring">Пръстен</option>
                    </select>
                    <label htmlFor="material">Материал</label>
                    <select onChange={handleChange} type="select" name="material" defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled={true}>--Моля изберете --</option>
                        <option value="gold">Злато</option>
                        <option value="gold">Злато</option>
                        <option value="gold">Злато</option>
                    </select>
                    <label htmlFor="description">Описание</label>
                    <textarea onChange={handleChange} name="description" cols="30" rows="3"></textarea>
                    <div className="flex-items">
                        <div className="flex-items__item">
                            <label htmlFor="price">Цена</label>
                            <input onChange={handleChange} type="number" name="price" />
                            <p>BGN</p>
                        </div>
                        <div className="flex-items__item">
                            <label htmlFor="discount">Намаление</label>
                            <input onChange={handleChange} type="number" name="discount" />
                            <p>BGN</p>
                        </div>
                    </div>
                    <label htmlFor="images" className="drop-container">
                        <span className="drop-title">Провлачете снимка тук</span>
                        или
                        <input type="file" onChange={(e) => { setImageUpload(e.target.files[0]) }} id="images" accept="image/*" required name="url" />
                        <button onClick={clearImage}>Премахни</button>
                    </label>
                    <input type="submit" className="button yellow" name="" value="Запиши" />
                </form>
            </div>
        </div>
    );
}