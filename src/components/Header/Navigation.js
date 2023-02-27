import React from "react";
export const Navigation = () => {
    return (
        <nav className="navigation">
            <ul className="navigation__links ul-clear">
                <li><a href="/">Начало</a></li>
                <li><a href="/products">Продукти</a></li>
                <li><a href="/blog">Блог</a></li>
                <li><a href="/contacts">Контакти</a></li>
            </ul>
        </nav>
    );
}