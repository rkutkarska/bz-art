import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useAuth } from '../../context/AuthContext';
import { ModalTemplate } from '../Modals/ModalTemplate';

export const HeaderItems = () => {
    const { currentUser } = useAuth();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalObject, setModalObject] = useState({});

    async function handleLogOut() {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            setIsModalOpen(true);
            setModalObject({ message: 'Неуспешно отписване!', type: 'error' });
        }
    }

    return (

        <div className="header__items">
            {isModalOpen ? <ModalTemplate obj={{ modalObject, setIsModalOpen }} /> : false}
            <div className="header__buttons">
                {
                    !currentUser &&
                    <>
                        <Link className="button yellow same-size-small" to="/login"><FontAwesomeIcon icon={solid('user')} className="fa-icon" />Вход</Link>
                        {/* <Link className="button yellow same-size-small" to="/register"><FontAwesomeIcon icon={solid('user')} className="fa-icon" />Регистрация</Link> */}
                    </>
                }
                {
                    currentUser &&
                    <>
                        <Link onClick={handleLogOut} className="button yellow same-size-small"><FontAwesomeIcon icon={solid('user')} className="fa-icon" />Изход</Link>
                        <Link className="button yellow same-size-small" to="/shopping-cart"><FontAwesomeIcon icon={solid('cart-shopping')} className="fa-icon" />Количка</Link>
                        <span className="items-count">5</span>
                        {/* TODO read from db item count in the cart */}
                    </>
                }
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