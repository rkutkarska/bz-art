import React from "react";
import {Link } from 'react-router-dom';

export const Navigation = () => {
    return (
        <nav className="navigation">
            <ul className="navigation__links ul-clear">
                <li><Link to="/">Начало</Link></li>
                <li><Link to="/items">Артикули</Link></li>
                <li><Link to="/contacts">Контакти</Link></li>
            </ul>
        </nav>
    );
}