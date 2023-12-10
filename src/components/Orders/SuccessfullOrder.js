import { Link, useParams } from 'react-router-dom';
import styles from './SuccessfullOrder.module.css';

export const SuccessfullOrder = () => {
    const { orderId } = useParams();

    return (
        <div className={`container order`}>
            <h1>Поръчка</h1>
            <div className={styles.order__detailes}>
                <h2>Поръчка с номер {orderId} е регистрирана успешно!</h2>
                <h2>Благодарим ти за доверието!</h2>
                <Link to="/orders-history" className="button purple">Към история на поръчките</Link>
            </div>
        </div>
    )
}