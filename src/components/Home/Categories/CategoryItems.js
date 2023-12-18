import { Link } from "react-router-dom";
import styles from './Categories.module.css';

export const CategoryItems = ({categories}) => {

    return (
        categories.map(category => (
            <section key={category.id} className={`${styles.category__item} category__item`}>
                <Link to={`/category/${category.id}/items`}>
                    <img src={category.categoryImageUrl} alt={category.categoryName} />
                    <div className={styles.overlay}>
                        <p>{category.categoryName}</p>
                    </div>
                </Link>
            </section>
        ))
    );
}