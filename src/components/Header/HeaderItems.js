import React from 'react';
import {Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export const HeaderItems = () => {
    return (
        <div className="header__items">
            <div className="header__buttons">
                <Link className="button yellow" to="/login"><FontAwesomeIcon icon={solid('user')} className="fa-icon" />Вход</Link>
                <Link className="button yellow" to="/logout"><FontAwesomeIcon icon={solid('user')} className="fa-icon" />Изход</Link>
                <Link className="button yellow" to="/cart"><FontAwesomeIcon icon={solid('cart-shopping')} className="fa-icon" />Количка</Link>
            </div>
            <Link to="/"><img className="logo" src={require('../../img/logo.png')} alt="logo" /></Link>
            <div className="header__search-bar">
                <form action="POST">
                    <input type="text" placeholder="Търсене..." name="search" />
                    <button type="submit"><FontAwesomeIcon icon={solid('magnifying-glass')} className={"fa-icon fa-magnifying-glass"} /></button>
                </form>
            </div>
        </div>
    );
}