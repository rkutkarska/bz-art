import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Spinner } from '../../Spinner/Spinner';

import * as categoriesService from '../../../services/categoriesService';
import styles from './ReadCategory.module.css';

export const ReadCategory = () => {
    const [category, setCategory] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { categoryId } = useParams();

    useEffect(() => {
        categoriesService.getCategory(categoryId)
            .then((category) => {
                setCategory(category)
                setIsLoading(false);
            });
    }, [])

    return (
        < div className={`${styles.read} container categories`}>
            {
                isLoading
                    ? <Spinner />
                    : <div className="form-container">
                        <h1>Преглед на категория</h1>
                        <form className={styles["category-form"]}>
                            <label>Име на категория:</label>
                            <input defaultValue={category.categoryName} type="text" disabled />
                            <label>Снимка:</label>
                            <img src={category.categoryImageUrl} className={styles.image__preview} alt={category.categoryName} />
                            <Link to="/crud-documents" className="button red">Затвори</Link>
                        </form>
                    </div>
            }
        </div >
    )
}