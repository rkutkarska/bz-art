import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ModalTemplate } from "../../../Modals/ModalTemplate";

import * as materialsService from "../../../../services/materialsService";
import styles from './CreateMaterial.module.css';

// TODO fix dynamic listing of existing materials

export const CreateMaterial = () => {
    const [materialsData, updateMaterialsData] = useState({
        materialName: '',
        dateCreated: {}
    });

    const [materials, setMaterials] = useState([]);
    const [materialNameHasError, setMaterialNameHasError] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalObject, setModalObject] = useState({});

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

    return (
        <div className="container">

            {isModalOpen ? <ModalTemplate obj={{ modalObject, setIsModalOpen }} /> : false}

            <h1>Създаване на материал</h1>
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
                    <label htmlFor="material-name">Име на материал:</label>
                    <input
                        id="material-name"
                        type="text"
                        name="materialName"
                        placeholder="Име на материал"
                        onChange={handleChange}
                        onBlur={(e) => materialsService.validateName(e, setMaterialNameHasError)}
                    />

                    {materialNameHasError && <p className="form-error">Името трябва да е с дължина от поне 3 символа!</p>}

                    <div className="buttons">
                        <Link to="/crud-documents" className={`button red ${styles.close}`}>Затвори</Link>
                        <input type="submit"
                            className={`button green ${styles.close}`}
                            value="Запази"
                            onClick={(e) => {
                                materialsService.saveMaterial(e, materials, materialsData, setMaterialNameHasError, setIsModalOpen, setModalObject);
                            }}
                        />
                    </div>

                </form>

            </div>
        </div>
    );
}