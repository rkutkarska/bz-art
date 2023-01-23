import React from "react";
export const Navigation = () => {
    return (
        <nav class="navigation">
            <ul class="navigation__links ul-clear">
                <li><a href="/home">Начало</a></li>
                <li><a href="/products">Продукти</a></li>
                <li><a href="/blog">Блог</a></li>
                <li><a href="/contacts">Контакти</a></li>
            </ul>
        </nav>
    );
}