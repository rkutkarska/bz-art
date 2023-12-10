import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrdersHistory } from "../../services/usersItemsService";
import { useAuth } from '../../context/AuthContext';
import { OrderDetails } from "./OrderDetails";

import styles from './OrderHistory.module.css'

export const OrdersHistory = () => {
    const [orders, setOrders] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        getOrdersHistory(currentUser.uid)
            .then((orders) => setOrders(orders));
    }, [])

    return (
        <div className='container'>
            <h1>Поръчки</h1>
            {
                orders.length === 0
                    ? <div className={styles['no-orders']}>
                        <h2>Все още няма направени поръчки...</h2>
                        <Link to="/shopping-cart" className={`button purple`}>Към количката</Link>
                    </div>
                    : <ul className={`${styles.orders__list} ul-clear`}>
                        {
                            orders.map((order) => (
                                <React.Fragment key={order.id}>
                                    <li className={styles.order__number}>{`Номер на поръчка: ${order.id}`}</li>
                                    <OrderDetails props={{ order, 'id': order.id }} />
                                </React.Fragment>
                            ))
                        }
                    </ul>
            }
        </div>
    );
}