import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { ModalTemplate } from '../../Modals/ModalTemplate';

import * as materialsService from "../../../services/materialsService";
import styles from './UpdateMaterial.module.css';

export const UpdateMaterial = () => {
    const [materials, setMaterials] = useState([]);
    const [material, setMaterial] = useState({});
    const [materialNameHasError, setMaterialNameHasError] = useState(false);
    const [materialsData, updateMaterialsData] = useState({});

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalObject, setModalObject] = useState({});

    const { materialId } = useParams();

    useEffect(() => {
        materialsService.getMaterial(materialId, setIsModalOpen, setModalObject)
            .then((material) => {
                setMaterial(material)
            });
    }, [])

    useEffect(() => {
        materialsService.getAll(setIsModalOpen, setModalObject)
            .then(materials => setMaterials(materials));
    }, []);

    const handleChange = (e) => {
        updateMaterialsData((oldValues) => ({
            ...oldValues,
            [e.target.name]: e.target.value.trim()
        }))
    }

    const updateDocument = async (e) => {
        await materialsService
            .updateMaterial(e, materialId, materialsData, setIsModalOpen, setModalObject)
    }

    return (
        <div className="container">

            {isModalOpen ? <ModalTemplate obj={{ modalObject, setIsModalOpen }} /> : false}

            <h1>Редактиране на материал</h1>
            <div className="form-container">
                <div className="existing-materials">
                    <label htmlFor="available-materials">Налични материали: </label>
                    {
                        materials.length === 0
                            ? <span>Все още няма добавени материали...</span>
                            : <ul name="materialName" id="available-materials">
                                {
                                    materials.map((material) => (
                                        <li
                                            key={material.id}
                                            value={material.materialName}
                                        >
                                            {material.materialName}
                                        </li>
                                    ))
                                }
                            </ul>
                    }
                </div>

                <form className={styles["materials-form"]}>
                    <label htmlFor="material-name">Име:</label>
                    <input
                        className={materialNameHasError ? "error" : undefined}
                        id="material-name"
                        type="text"
                        name="materialName"
                        defaultValue={material.materialName}
                        onChange={handleChange}
                        onBlur={(e) => materialsService.validateName(e, setMaterialNameHasError)}
                    />

                    {materialNameHasError && <p className="form-error">Името трябва да е с дължина от поне 3 символа!</p>}

                    <div className={styles.buttons}>
                        <Link to="/admin-panel" className={`button red ${styles.close}`}>Затвори</Link>
                        <button onClick={updateDocument} className={`button orange ${styles.update}`}>Обнови</button>
                    </div>

                </form>

            </div>
        </div>
    )
}
