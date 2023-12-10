import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import styles from './OrderDetailes.module.css'

export const OrderDetails = ({ props }) => {

    const orderDetailes = props.order;

    return (
        <ul className={`${styles.order__detailes} ul-clear`} key={orderDetailes.id + 0}>
            <li key={orderDetailes.id + 1}>
                <FontAwesomeIcon icon={solid('calendar-days')} className="fa-icon"/>
                {`${orderDetailes.dateCreated.toDate().toLocaleString("bg-BG", { dateStyle: 'long', timeStyle: "short" })}`}
            </li>
            {
                Object.values(orderDetailes).map((x) => (
                    x.id &&
                    <li className={styles.item} key={x.id}>
                        {
                            <>
                                <Link to={`/items/${x.id}`} target="_blank">
                                    <img className={styles['item-image']} src={x.imageUrl} />
                                </Link>
                                <p>{`${x.desiredQuantity} бр.`}</p>
                                <p>x</p>
                                <p>{`${x.price} лв.`}</p>
                                <p>{`${x.desiredQuantity * x.price} лв.`}</p>
                            </>
                        }
                    </li>

                ))
            }
            <hr className={styles.delimieter} />
            <li className={styles['order__total-sum']} key={orderDetailes.id + 2}>
                {`Обща сума: ${orderDetailes.totalSum} лв.`}
            </li>
        </ul>
    );
}