import { Link } from 'react-router-dom';
import { ItemActionButtons } from '../../Items/ItemActionButtons/ItemActionButtons';

export const NewItem = ({ items }) => {
    let newItemsList = [];

    for (let i = 0; i < items.length; i += 3) {
        newItemsList.push(
            <div key={'new' + i} className="new__items">
                {
                    items.filter(x => x.quantity > 0 && x.isPinnedToHome).slice(i, i + 3).map(item => (
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
                                <ItemActionButtons props={{ 'item': item, 'quantity': 1 }} />
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