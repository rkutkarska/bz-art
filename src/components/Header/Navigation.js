import { NavLink } from 'react-router-dom';

export const Navigation = () => {

    const setNavStyle = ({ isActive }) => {
        return isActive ? 'active-link' : undefined;
    }

    return (
        <nav className="navigation">
            <ul className="navigation__links ul-clear">
                <li><NavLink className={setNavStyle} to="/">Начало</NavLink></li>
                <li><NavLink className={setNavStyle} to="/items">Артикули</NavLink></li>
                <li><NavLink className={setNavStyle} to="/contacts">Контакти</NavLink></li>
            </ul>
        </nav>
    );
}