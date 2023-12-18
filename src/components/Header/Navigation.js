import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export const Navigation = () => {

    const setNavStyle = ({ isActive }) => {
        return isActive ? 'active-link' : undefined;
    }

    return (
        <nav className={styles.navigation}>
            <ul className={`${styles["navigation__links"]} ul-clear`}>
                <li><NavLink className={setNavStyle} to="/">Начало</NavLink></li>
                <li><NavLink className={setNavStyle} to="/items">Артикули</NavLink></li>
                <li><NavLink className={setNavStyle} to="/contacts">Контакти</NavLink></li>
            </ul>
        </nav>
    );
}