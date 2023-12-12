import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { ModalTemplate } from "../../Modals/ModalTemplate";

import * as  categoriesService from "../../../services/categoriesService";
import * as  materialsService from "../../../services/materialsService";
import * as itemsService from "../../../services/itemsService";

import styles from './UpdateItem.module.css';

export const UpdateItem = () => {

    const { itemId } = useParams();

    const [categories, setCategories] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [values, updateValues] = useState([]);
    const [imageUpload, setImageUpload] = useState('');
    const [item, setItem] = useState({});
    const [newImageUrl, setNewImageUrl] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalObject, setModalObject] = useState({});

    // Form Errors
    const [itemNameHasError, setItemNameHasError] = useState('');
    const [itemTypeHasError, setItemTypeHasError] = useState('');
    const [descriptionHasError, setDescriptionHasError] = useState('');
    const [quantityHasError, setQuantityHasError] = useState('');
    const [priceHasError, setPriceHasError] = useState('');
    const [discountHasError, setDiscountHasError] = useState('');

    useEffect(() => {
        itemsService.getItem(itemId, setIsModalOpen, setModalObject)
            .then((item) => {
                setItem(item)
            });
    }, [])

    useEffect(() => {
        categoriesService.getAll()
            .then(categories => setCategories(categories));
    }, []);

    useEffect(() => {
        materialsService.getAll()
            .then(materials => setMaterials(materials));
    }, []);

    useEffect(() => {
        itemsService
            .getItem(itemId, setIsModalOpen, setModalObject)
            .then((doc) => {
                setItem(doc)
            });
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

        updateValues((oldValues) => ({
            ...oldValues,
            [e.target.name]: objValue
        }))
    }

    const clearImage = (e) => {
        e.preventDefault();
        updateValues({ ...values, imageUrl: '' });
        e.target.previousSibling.value = '';
    };

    const updateDocument = async (e) => {
        await itemsService
            .updateItem(
                e,
                itemId,
                values,
                imageUpload,
                setNewImageUrl,
                itemNameHasError,
                itemTypeHasError,
                descriptionHasError,
                quantityHasError,
                priceHasError,
                discountHasError,
                setIsModalOpen,
                setModalObject,
            )
    }

    return (
        <div className={`container ${styles.update}`}>

            {isModalOpen ? <ModalTemplate obj={{ modalObject, setIsModalOpen }} /> : false}

            <div className="form-container">
                <h1>Редактиране на артикул</h1>
                <form onChange={handleChange} className="form">
                    <label htmlFor="name" >Име</label>
                    <input
                        defaultValue={item.name}
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Име на артикул"
                        onBlur={(e) => itemsService.validateName(e, setItemNameHasError)}
                    />
                    {itemNameHasError && <p className="form-error">Името трябва да е с дължина от поне 3 символа!</p>}

                    <label htmlFor="type">Вид</label>
                    <input
                        defaultValue={item.type}
                        id="type"
                        type="text"
                        name="type"
                        placeholder="Вид артикул"
                        onBlur={(e) => itemsService.validateType(e, setItemTypeHasError)}
                    />
                    {itemTypeHasError && <p className="form-error">Видът на артикула трябва да е с дължина от поне 3 символа!</p>}

                    <label htmlFor="available-categories" className="existing-categories">Категории: </label>
                    <select name="categoryName" id="available-categories">
                        <option defaultValue={item.categoryName}>{item.categoryName}</option>
                        {
                            (categories.filter(x => x.categoryName !== item.categoryName)).map((category) => (
                                <option
                                    key={category.id}
                                    value={category.categoryName}
                                >
                                    {category.categoryName}
                                </option>
                            ))
                        }
                    </select>
                    <label htmlFor="material">Материал</label>
                    <select defaultValue={item.material} id="material" type="select" name="materialName" >
                        {
                            materials.map((material) => (
                                <option value={material.materialName} key={material.id}>
                                    {material.materialName}
                                </option>
                            ))
                        }
                    </select>

                    <label htmlFor="description">Описание</label>
                    <textarea
                        defaultValue={item.description}
                        id="description"
                        name="description"
                        cols="30"
                        rows="3"
                        placeholder="Въведете описание"
                        onBlur={(e) => itemsService.validateDescription(e, setDescriptionHasError)}
                    />
                    {descriptionHasError && <p className="form-error">Описанието трябва да е с дължина между 10 и 200 символа!</p>}

                    <div className="flex-items">
                        <div className="flex-items__item">
                            <label htmlFor="quantity">Количество</label>
                            <input
                                id="quantity"
                                type="number"
                                step="1" min="1"
                                name="quantity"
                                defaultValue={item.quantity}
                                onBlur={(e) => itemsService.validateQuantity(e, setQuantityHasError)}
                                onInput={(e) => e.target.value = (parseInt(e.target.value))}
                                required
                            />
                            <p>бр.</p>
                        </div>

                        <div className="flex-items__item">
                            <label htmlFor="price">Цена</label>
                            <input
                                defaultValue={item.price}
                                id="price"
                                type="number"
                                step="0.01"
                                min="0.00"
                                name="price"
                                placeholder="0.00"
                                onBlur={(e) => itemsService
                                    .validatePriceAndDiscountInUpdate(e, setPriceHasError, setDiscountHasError, item.price, item.discount, values.price, values.discount)
                                }
                                required
                            />
                            <p>BGN</p>
                        </div>

                        <div className="flex-items__item">
                            <label htmlFor="discount">Намаление</label>
                            <input
                                defaultValue={item.discount}
                                id="discount"
                                type="number"
                                step="0.01"
                                min="0.00"
                                name="discount"
                                placeholder="0.00"
                                onBlur={(e) => itemsService
                                    .validatePriceAndDiscountInUpdate(e, setPriceHasError, setDiscountHasError, item.price, item.discount, values.price, values.discount)
                                }
                            />
                            <p>BGN</p>
                        </div>

                    </div>
                    {quantityHasError && <p className="form-error">Количеството трябва да е поне 1 брой!</p>}
                    {priceHasError && <p className="form-error">Цената трябва да е поне 1 лв.!</p>}
                    {discountHasError && <p className="form-error">Отстъпката не може да бъде по-висока от цената!</p>}


                    <div className={styles["form-check"]}>
                        <label htmlFor="index-label">Етикет:</label>
                        <div>
                            <input defaultValue={item.isNew} id="isNew" className="form-check-input" type="checkbox" name="isNew" value={values.isNew} />
                            <label htmlFor="isNew">Ново</label>
                        </div>

                        <div>
                            <input defaultValue={item.hasDiscount} id="hasDiscount" className="form-check-input" type="checkbox" name="hasDiscount" value={values.hasDiscount} />
                            <label htmlFor="hasDiscount">Промоция</label>
                        </div>

                        <div>
                            <input defaultValue={item.isPinnedToHome} id="isPinnedToHome" className="form-check-input" type="checkbox" name="isPinnedToHome" value={values.isPinnedToHome} />
                            <label htmlFor="isPinnedToHome">Закачи в начало</label>
                        </div>

                    </div>
                    <label htmlFor="image" className="drop-container">
                        <span className="drop-title">Провлачете снимка тук</span>
                        или
                        <div className="flex-items">
                            <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} id="images" accept="image/*" name="imageUrl" />
                            <button className="button red" onClick={clearImage}><FontAwesomeIcon icon={solid('trash')} className="fa-icon" />Премахни</button>
                        </div>
                        {
                            newImageUrl !== ''
                                ? <img className={styles.image__preview} src={newImageUrl} />
                                : (imageUpload === '' ? <img className={styles.image__preview} src={item.imageUrl} /> : null)
                        }
                    </label>
                    <div className={styles.buttons}>
                        <Link to="/crud-documents" className={`button red ${styles.close}`}>Затвори</Link>
                        <button onClick={updateDocument} className={`button orange ${styles.update}`}>Обнови</button>
                    </div>
                </form>
            </div>
        </div>
    );
}