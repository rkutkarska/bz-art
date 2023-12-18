import { Link } from "react-router-dom";
import styles from './Hero.module.css';

export const Hero = () => {
    return (
        <div className={styles.hero}>
            <div className={styles.hero__caption}>
                <div className={styles.caption__container}>
                    <p className={styles.caption__text}>50% отстъпка на бижута с естествени камъни!</p>
                    <Link to="/current-promotion" className={`button ${styles.white} same-size-large`}>Разгледай</Link>
                </div>
            </div>
            <img className={styles.hero__image} src={require("../../../img/hero-banner.jpg")} alt="jewellery" />
        </div>
    );
}