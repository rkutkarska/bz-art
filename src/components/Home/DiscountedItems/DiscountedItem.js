import { Link } from 'react-router-dom';
import { ItemActionButtons } from '../../Items/ItemActionButtons/ItemActionButtons';

export const DiscountedItem = ({ items }) => {

    let discountedItemsList = [];

    for (var i = 0; i < items.length; i += 3) {
        discountedItemsList.push(
            <div key={'discounted' + i} className="discounted__items">
                {
                    items.slice(i, i + 3).map(item => (
                        <section key={item.id} className="discounted__item">
                            <Link to={`/items/${item.id}`}><img src={item.imageUrl} alt="ring" /></Link>
                            <div className="discounted__actions">
                                <div className="discounted__description">
                                    <p className="item-name">{item.name}</p>
                                    <p className="item-price">
                                        <s>{item.price}</s> лв.<br />
                                        <span className="final-price">{item.price - item.discount} лв.</span>
                                    </p>
                                </div>
                                <div className="discounted__tag">
                                    <div className="discount-tag">{`- ${((item.discount / item.price) * 100).toFixed(0)} %`}</div>
                                </div>
                                <ItemActionButtons props={{'item': item, 'quantity': 1}}/>
                            </div>
                        </section >
                    ))
                }
            </div>
        );
    }

    return (
        <>
            {discountedItemsList}
        </>
    );
}