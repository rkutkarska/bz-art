import React from "react";
import { useState } from "react";
import { storage, db } from "../Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import "../styles/CreateItem.css";

export const CreateItem = () => {

    const initialFormData = Object.freeze({
        'item-name': '',
        'item-category': '',
        'item-material': '',
        'item-description': '',
        'item-price': 0,
        'item-discount': 0,
        'item-url': ''
    });

    const [formData, updateFormData] = React.useState(initialFormData);
    const [imageUpload, setImageUpload] = useState(null);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    }

    const saveItem = (e) => {
        e.preventDefault();
        console.log(formData);
        // console.log(e.target)
        if (imageUpload == null) { alert('Неуспешно качване!'); return; }
        const imageRef = ref(storage, `images/items/${v4() + imageUpload.name}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            alert('Файлът е качен успешно!');
            getDownloadURL(imageRef).then((url) => {
                console.log(url);
            });
        });
    };

    const clearImage = () => {
        setImageUpload(null);
    };

    return (
        <div className="container">
            <div className="form-container">
                <h1>Добавяне на продукт</h1>
                <form onSubmit={saveItem} className="form">
                    <label htmlFor="item-name">Име</label>
                    <input onChange={handleChange} type="text" name="item-name" />
                    <label htmlFor="item-category">Категория</label>
                    <select onChange={handleChange} name="item-category" defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled={true}>--Моля изберете --</option>
                        <option value="ring">Пръстен</option>
                        <option value="ring">Пръстен</option>
                        <option value="ring">Пръстен</option>
                    </select>
                    <label htmlFor="item-material">Материал</label>
                    <select onChange={handleChange} type="select" name="item-material" defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled={true}>--Моля изберете --</option>
                        <option value="gold">Злато</option>
                        <option value="gold">Злато</option>
                        <option value="gold">Злато</option>
                    </select>
                    <label htmlFor="item-description">Описание</label>
                    <textarea onChange={handleChange} name="item-description" cols="30" rows="3"></textarea>
                    <div className="flex-items">
                        <div className="flex-items__item">
                            <label htmlFor="item-price">Цена</label>
                            <input onChange={handleChange} type="number" name="item-price" />
                            <p>BGN</p>
                        </div>
                        <div className="flex-items__item">
                            <label htmlFor="item-discount">Намаление</label>
                            <input onChange={handleChange} type="number" name="item-discount" />
                            <p>BGN</p>
                        </div>
                    </div>
                    <label htmlFor="images" className="drop-container">
                        <span className="drop-title">Провлачете снимка тук</span>
                        или
                        <input type="file" onChange={(e) => { setImageUpload(e.target.files[0]) }} id="images" accept="image/*" required name="item-url" />
                        {/* <button onClick={uploadImage}>Качи</button> */}
                        <button onClick={clearImage}>Премахни</button>
                    </label>
                    <input type="submit" className="button yellow" name="" value="Запиши" />
                </form>
            </div>
        </div>
    );
}