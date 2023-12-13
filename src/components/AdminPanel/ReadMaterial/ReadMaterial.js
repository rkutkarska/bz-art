import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { Spinner } from '../../Spinner/Spinner';
import { ModalTemplate } from "../../Modals/ModalTemplate";

import * as materialsService from '../../../services/materialsService';

import styles from './ReadMaterial.module.css';

export const ReadMaterial = () => {
    const [material, setMaterial] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalObject, setModalObject] = useState({});

    const { materialId } = useParams();

    useEffect(() => {
        materialsService.getMaterial(materialId, setIsModalOpen, setModalObject)
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
                        {isModalOpen ? <ModalTemplate obj={{ modalObject, setIsModalOpen }} /> : false}

                        <h1>Преглед на материал</h1>
                        <p className="date-created">Записът е създаден на: {material.dateCreated.toDate().toLocaleString("bg-BG", { dateStyle: 'long', timeStyle: "short" })}</p>
                        <div className="form-container">
                            <form className={styles["materials-form"]}>
                                <label>Име:</label>
                                <input type="text" defaultValue={material.materialName} disabled />
                                <Link to="/admin-panel" className="button red">Затвори</Link>
                            </form>
                        </div>
                    </>
            }
        </div>
    )
}