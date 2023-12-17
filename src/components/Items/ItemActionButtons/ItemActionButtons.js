import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';
import { ModalTemplate } from '../../Modals/ModalTemplate';

import * as usersItemsService from "../../../services/usersItemsService";
import { getUserData } from '../../../services/usersService';

export const ItemActionButtons = ({ props }) => {
    const { currentUser } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalObject, setModalObject] = useState({});
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (currentUser) {
            getUserData(currentUser.uid)
                .then((res) => setUserData(res));
        }
    }, [])

    return (
        <>
            {isModalOpen ? <ModalTemplate obj={{ modalObject, setIsModalOpen }} /> : false}
            <div className="buttons">

                <Link
                    className="button purple" to={`/items/${props.item.id}`}
                >
                    <FontAwesomeIcon icon={solid('eye')} className="fa-icon" />
                    Детайли
                </Link>
                {
                    (currentUser && userData.role === 2) &&
                    <Link
                        className="button yellow"
                        onClick={(e) => {
                            usersItemsService
                                .addToCart(e, currentUser.uid, props.item.id, props.quantity)
                                .then(() => {
                                    setIsModalOpen(true);
                                    setModalObject({ message: 'Артикулът е добавен в количката!', type: 'information' });
                                })
                        }}
                    >
                        <FontAwesomeIcon icon={solid('cart-shopping')} className="fa-icon" />
                        Добави
                    </Link>
                }
            </div>
        </>
    );
}