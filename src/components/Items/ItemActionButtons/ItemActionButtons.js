import { useAuth } from '../../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';

import * as usersItemsService from "../../../services/usersItemsService";

export const ItemActionButtons = ({ props }) => {
    const { currentUser } = useAuth();

    return (
        <div className="buttons">
            <Link
                className="button purple" to={`/items/${props.item.id}`}
            >
                <FontAwesomeIcon icon={solid('eye')} className="fa-icon" />
                Детайли
            </Link>
            {
                currentUser &&
                <Link
                    className="button yellow"
                    onClick={(e) => {
                        usersItemsService
                            .addToCart(e, currentUser.uid, props.item.id, props.quantity)
                    }}
                >
                    <FontAwesomeIcon icon={solid('cart-shopping')} className="fa-icon" />
                    Добави
                </Link>
            }
        </div>
    );
}