import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export const HeaderItems = () => {
    return (
        <div className="header__items">
            <div className="header__buttons">
                <a className="button yellow" href="/login.html"><FontAwesomeIcon icon={solid('user')} className="fa-icon" />Вход</a>
                <a className="button yellow" href="/logout"><FontAwesomeIcon icon={solid('user')} className="fa-icon" />Изход</a>
                <a className="button yellow" href="/cart"><FontAwesomeIcon icon={solid('cart-shopping')} className="fa-icon" />Количка</a>
            </div>
            <a href="/"><img className="logo" src={require('../../img/logo.png')} alt="logo" /></a>
            <div className="header__search-bar">
                <form action="POST">
                    <input type="text" placeholder="Търсене..." name="search" />
                    <button type="submit"><FontAwesomeIcon icon={solid('magnifying-glass')} className={"fa-icon fa-magnifying-glass"} /></button>
                </form>
            </div>
        </div>
    );
}