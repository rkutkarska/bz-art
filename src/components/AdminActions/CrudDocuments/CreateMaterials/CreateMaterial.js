import React, { useState, useEffect } from "react"
import { ModalTemplate } from "../../../Modals/ModalTemplate";
import * as materialsService from "../../../../services/materialsService";

import styles from './CreateMaterial.module.css';

export const CreateMaterial = () => {
    const [materialNameHasError, setMaterialNameHasError] = useState(false);

    const [materialsData, setMaterialsData] = useState({
        materialName: '',
        dateCreated: {}
    });

    const handleChange = (e) => {
        setMaterialsData((oldValues) => ({
            ...oldValues,
            [e.target.name]: e.target.value.trim()
        }))
    }

    const validateName = (e) => {
        if (e.target.value.length < 3) {
            setMaterialNameHasError(true);
        } else {
            setMaterialNameHasError(false);
        }
    }

    return (
        <div className="container">
            <h1>Добавяне на материали</h1>

            <div className="form-container">
                <form className={styles["materials-form"]}>
                    <label htmlFor="material-name">Име:</label>
                    <input
                        className={materialNameHasError ? "error" : undefined}
                        id="material-name"
                        type="text"
                        name="materialName"
                        placeholder="Име на материал"
                        onChange={handleChange}
                        onBlur={validateName}
                    />

                    {materialNameHasError && <p className="form-error">Името трябва да е с дължина от поне 3 символа!</p>}

                    <input type="submit"
                        className="button green"
                        value="Запази"
                        onClick={(e) => {
                            materialsService.saveMaterial(e, materialsData);
                        }}
                    />
                </form>
            </div>
        </div>
    );
}