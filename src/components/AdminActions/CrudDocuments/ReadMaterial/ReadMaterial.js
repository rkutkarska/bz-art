import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Spinner } from '../../../Spinner/Spinner';
import * as materialsService from '../../../../services/materialsService';

import styles from './ReadMaterial.module.css';

export const ReadMaterial = () => {
    const [material, setMaterial] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { materialId } = useParams();

    useEffect(() => {
        materialsService.getMaterial(materialId)
            .then((material) => {
                setMaterial(material)
                setIsLoading(false);
            });
    }, [])

    return (
        <div className={`${styles.read} container`}>
            {
                isLoading
                    ? <Spinner />
                    : <>
                        <h1>Преглед на материал</h1>
                        <div className="form-container">
                            <form className={styles["materials-form"]}>
                                <label>Име:</label>
                                <input type="text" defaultValue={material.materialName} disabled />
                                <Link to="/crud-documents" className="button red">Затвори</Link>
                            </form>
                        </div>
                    </>
            }
        </div>
    )
}