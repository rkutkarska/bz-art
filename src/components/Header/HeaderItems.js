import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { ModalTemplate } from '../Modals/ModalTemplate';
import { useAuth } from '../../context/AuthContext';
import * as usersService from '../../services/usersService';


export const HeaderItems = () => {
    const { currentUser } = useAuth();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalObject, setModalObject] = useState({});

    const [userData, setUserData] = useState(false);
    const [isHidden, setIsHidden] = useState(true);


    const ref = useRef()

    useEffect(() => {
        getUserData();
    }, [])

    const getUserData = () => {
        if (currentUser) {
            usersService.getUserData(currentUser.uid)
                .then((res) => setUserData(res));
        }
    }

    async function handleLogOut() {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            setIsModalOpen(true);
            setModalObject({ message: 'Неуспешно отписване!', type: 'error' });
        }
    }

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (ref.current && !ref.current.contains(e.target) && !ref.current.parentElement.contains(e.target)) {
                setIsHidden(true);
            }
        }
        document.addEventListener("click", checkIfClickedOutside)
    }, [isHidden])

    return (

        <div className="header__items">
            {isModalOpen ? <ModalTemplate obj={{ modalObject, setIsModalOpen }} /> : false}
            <div className="header__buttons">
                {
                    !currentUser &&
                    <>
                        <Link className="button yellow same-size-small" to="/login"><FontAwesomeIcon icon={solid('user')} className="fa-icon" />Вход</Link>
                        <Link className="button yellow same-size-small" to="/register"><FontAwesomeIcon icon={solid('user')} className="fa-icon" />Регистрация</Link>
                    </>
                }

                {
                    currentUser &&
                    <>
                        <button className={`profile button yellow same-size-small ${!isHidden && "active-button"}`} onClick={() => setIsHidden(s => !s)} >
                            <FontAwesomeIcon icon={solid('user')} className="fa-icon" />Профил
                            {
                                !isHidden ?
                                    <ul className="profile__options ul-clear" ref={ref}>
                                        {
                                            (userData.role == 0) || (userData.role == 1)
                                                ? <>
                                                    <li><Link to="/admin-panel"><FontAwesomeIcon icon={solid('gear')} className="fa-icon" />Административен панел</Link></li>
                                                </>
                                                : null
                                        }

                                        {
                                            (userData.role == 2) &&
                                            <>
                                                <li><Link to="/favourites"><FontAwesomeIcon icon={solid('heart')} className="fa-icon" />Любими</Link></li>
                                                <li><Link to="/orders-history"><FontAwesomeIcon icon={solid('clock-rotate-left')} className="fa-icon" />Поръчки</Link></li>
                                            </>
                                        }

                                        <li><Link onClick={handleLogOut}><FontAwesomeIcon icon={solid('user')} className="fa-icon" />Изход</Link></li>
                                    </ul>
                                    : null
                            }
                        </button>
                        {
                            userData.role == 0 || userData.role == 1
                                ? null
                                : <><Link className="button yellow same-size-small" to="/shopping-cart"><FontAwesomeIcon icon={solid('cart-shopping')} className="fa-icon" />Количка</Link>
                                    {/* TODO read from db item count in the cart */}
                                    {/* <span className="items-count">5</span> */}
                                </>
                        }
                    </>
                }
            </div>
            <Link to="/"><img className="logo" src={require('../../img/logo.png')} alt="logo" /></Link>
            <div className="header__search-bar">
                <form action="POST">
                    <input type="text" placeholder="Търсене..." name="search" />
                    {/* TODO search */}
                    <button onClick={(e) => e.preventDefault()}>
                        <FontAwesomeIcon icon={solid('magnifying-glass')} className={"fa-icon fa-magnifying-glass"} />
                    </button>
                </form>
            </div>
        </div >
    );
}