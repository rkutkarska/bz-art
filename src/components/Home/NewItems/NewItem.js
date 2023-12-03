import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import * as usersItemsService from "../../../services/usersItemsService";

export const NewItem = ({ items }) => {
    const { currentUser } = useAuth();

    let newItemsList = [];

    for (var i = 0; i < items.length; i += 3) {
        newItemsList.push(
            <div key={'new' + i} className="new__items">
                {
                    items.slice(i, i + 3).map(item => (
                        <section key={item.id} className="new__item">
                            <Link to={`/items/${item.id}`}><img src={item.imageUrl} alt="ring" /></Link>
                            <div className="new__actions">
                                <div className="new__description">
                                    <p className="item-name">{item.name}</p>
                                    <p className="item-price">{item.price} лв.</p>
                                </div>
                                <div className="new__tags">
                                    <div className="new-tag">НОВО</div>
                                </div>
                                <div className="buttons">
                                    <Link
                                        className="button purple" to={`/items/${item.id}`}
                                    >
                                        <FontAwesomeIcon icon={solid('eye')} className="fa-icon" />
                                        Детайли
                                    </Link>

                                    {
                                        currentUser &&
                                        <Link
                                            className="button yellow"
                                            onClick={(e) =>
                                                usersItemsService
                                                    .addToCart(e, currentUser.uid, item.id, 1)
                                            }
                                        >
                                            <FontAwesomeIcon icon={solid('cart-shopping')} className="fa-icon" />
                                            Добави
                                        </Link>
                                    }

                                </div>
                            </div>
                        </section >
                    ))
                }
            </div>
        );
    }

    return (
        <>
            {newItemsList}
        </>
    )
}