import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { AddCategory } from "./AddCategory";
import { ModalTemplate } from "../../Modals/ModalTemplate";

import * as itemsService from '../../../services/itemsService';
import * as materialsService from '../../../services/materialsService';

import styles from "./CreateItem.module.css";

export const CreateItem = () => {

    const [itemsData, updateItemsData] = useState({
        name: '',
        type: '',
        categoryName: '',
        materialName: '',
        description: '',
        quantity: 1,
        price: 0,
        discount: 0,
        imageUrl: '',
        isNew: false,
        hasDiscount: false,
        isPinnedToHome: false,
        dateCreated: {}
    });

    const [itemImageUpload, setItemImageUpload] = useState('');
    const [materials, setMaterials] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalObject, setModalObject] = useState({});

    // Form Errors
    const [itemNameHasError, setItemNameHasError] = useState('');
    const [itemTypeHasError, setItemTypeHasError] = useState('');
    const [descriptionHasError, setDescriptionHasError] = useState('');
    const [quantityHasError, setQuantityHasError] = useState('');
    const [priceHasError, setPriceHasError] = useState('');
    const [discountHasError, setDiscountHasError] = useState('');
    const [materialHasError, setMaterialHasError] = useState('');
    const [categoryHasError, setCategoryHasError] = useState('');

    useEffect(() => {
        materialsService.getAll()
            .then((materials) => setMaterials(materials));
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
        <div className={`container ${styles.create}`}>
            {isModalOpen ? <ModalTemplate obj={{ modalObject, setIsModalOpen }} /> : false}
            <div className="form-container">
                <h1>Създаване на артикул</h1>
                <form
                    onSubmit={(e) => itemsService
                        .saveItem(
                            e,
                            itemImageUpload,
                            itemsData,
                            itemNameHasError,
                            itemTypeHasError,
                            descriptionHasError,
                            quantityHasError,
                            priceHasError,
                            discountHasError,
                            itemsData.materialName,
                            itemsData.categoryName,
                            setMaterialHasError,
                            setCategoryHasError,
                            setIsModalOpen,
                            setModalObject)}
                    className="form items"
                >
                    <label htmlFor="name">Име</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Име на артикул"
                        onChange={handleChange}
                        onBlur={(e) => itemsService.validateName(e, setItemNameHasError)}
                        required
                    />
                    {itemNameHasError && <p className="form-error">Името трябва да е с дължина от поне 3 символа!</p>}

                    <label htmlFor="type">Вид</label>
                    <input
                        id="type"
                        type="text"
                        name="type"
                        placeholder="Вид артикул"
                        onChange={handleChange}
                        onBlur={(e) => itemsService.validateType(e, setItemTypeHasError)}
                        required
                    />
                    {itemTypeHasError && <p className="form-error">Видът на артикула трябва да е с дължина от поне 3 символа!</p>}

                    <AddCategory props={{ updateItemsData, categoryHasError }} />

                    <label htmlFor="material">Материал</label>
                    <select
                        id="material"
                        type="select"
                        name="materialName"
                        defaultValue={'DEFAULT'}
                        onChange={handleChange}
                        required
                    >
                        <option value="DEFAULT" disabled={true}>-- Моля, изберете --</option>
                        {
                            materials.map((material) => (
                                <option value={material.materialName} key={material.id}>
                                    {material.materialName}
                                </option>
                            ))
                        }
                    </select>
                    {materialHasError && <p className="form-error">Материалът е задължителен!</p>}

                    <label htmlFor="description">Описание</label>
                    <textarea
                        id="description"
                        name="description"
                        cols="30"
                        rows="3"
                        placeholder="Въведете описание"
                        onChange={handleChange}
                        onBlur={(e) => itemsService.validateDescription(e, setDescriptionHasError)}
                    />
                    {descriptionHasError && <p className="form-error">Описанието трябва да е с дължина между 10 и 200 символа!</p>}

                    <div className={`flex-items ${styles.inputs}`}>
                        <div className="flex-items__item">
                            <label htmlFor="quantity">Количество</label>
                            <input
                                id="quantity"
                                type="number"
                                step="1" min="1"
                                name="quantity"
                                defaultValue={1}
                                onChange={handleChange}
                                onBlur={(e) => itemsService.validateQuantity(e, setQuantityHasError)}
                                onInput={(e) => e.target.value = (parseInt(e.target.value))}
                                required
                            />
                            <p>бр.</p>
                        </div>
                        <div className="flex-items__item">
                            <label htmlFor="price">Цена</label>
                            <input
                                id="price"
                                type="number"
                                step="0.01" min="0.00"
                                name="price"
                                placeholder="0.00"
                                pattern="[0-9\.]+"
                                onChange={handleChange}
                                onBlur={(e) => itemsService
                                    .validatePriceAndDiscount(e, setPriceHasError, setDiscountHasError, itemsData.price, itemsData.discount)
                                }
                                required
                            />
                            <p>BGN</p>
                        </div>
                        <div className="flex-items__item">
                            <label htmlFor="discount">Намаление</label>
                            <input
                                id="discount"
                                type="number"
                                step="0.01" min="0.00"
                                name="discount"
                                placeholder="0.00"
                                pattern="[0-9\.]+"
                                // TODO mozilla alphanumeric problem
                                // onInput={(e) => e.target.value = (parseFloat(e.target.value))}
                                onBlur={(e) => itemsService
                                    .validatePriceAndDiscount(e, setPriceHasError, setDiscountHasError, itemsData.price, itemsData.discount)
                                }
                                onChange={handleChange} />
                            <p>BGN</p>
                        </div>
                    </div>
                    {quantityHasError && <p className="form-error">Количеството трябва да е поне 1 брой!</p>}
                    {priceHasError && <p className="form-error">Цената трябва да е поне 1 лв.!</p>}
                    {discountHasError && <p className="form-error">Отстъпката не може да бъде по-висока от цената!</p>}


                    <div className={styles["item-pins"]}>
                        <label htmlFor="index-label">Етикет:</label>
                        <div>
                            <input id="isNew" className="form-check-input" type="checkbox" name="isNew" value={itemsData.isNew} onChange={handleChange} />
                            <label htmlFor="isNew">Ново</label>
                        </div>

                        <div>
                            <input id="hasDiscount" className="form-check-input" type="checkbox" name="hasDiscount" value={itemsData.hasDiscount} onChange={handleChange} />
                            <label htmlFor="hasDiscount">Промоция</label>
                        </div>

                        <div>
                            <input id="isPinnedToHome" className="form-check-input" type="checkbox" name="isPinnedToHome" value={itemsData.isPinnedToHome} onChange={handleChange} />
                            <label htmlFor="isPinnedToHome">Закачи в начало</label>
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
                    <div className="buttons">
                        <Link to="/crud-documents" className={`button red ${styles.close}`}>Затвори</Link>
                        <input type="submit" className={`button green ${styles.create}`} value="Запиши" />
                    </div>
                </form>
            </div>
        </div>
    );
}