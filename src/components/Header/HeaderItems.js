import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useAuth } from '../../context/AuthContext';

export const HeaderItems = () => {
    // const { currentUser } = useAuth();
    const navigate = useNavigate();
    const { logout } = useAuth();

    async function handleLogOut() {
        try {
            await logout();
            navigate("/login");

        } catch (error) {
            // console.log(Неуспешно отписване!)
            // TODO modal
        }
    }

    return (
        <div className="header__items">
            <div className="header__buttons">
                <Link className="button yellow" to="/login"><FontAwesomeIcon icon={solid('user')} className="fa-icon" />Вход</Link>
                <Link onClick={handleLogOut} className="button yellow"><FontAwesomeIcon icon={solid('user')} className="fa-icon" />Изход</Link>
                <Link className="button yellow" to="/cart"><FontAwesomeIcon icon={solid('cart-shopping')} className="fa-icon" />Количка</Link>
                {/* TODO read from db item count in the cart */}
                <span className="items-count">5</span>
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