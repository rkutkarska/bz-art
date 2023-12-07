import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ModalTemplate } from '../../Modals/ModalTemplate';

import * as usersService from "../../../services/usersService";
import styles from './UpdateUser.module.css';

export const UpdateUser = () => {
    const [user, setUser] = useState({});
    const [userRole, updateUserRole] = useState({});

    const { userId } = useParams();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalObject, setModalObject] = useState({});

    useEffect(() => {
        usersService.getUserData(userId, setModalObject)
            .then((userData) => {
                setUser(userData)
            });
    }, [])

    const handleChange = (e) => {
        updateUserRole((oldValues) => ({
            ...oldValues,
            [e.target.name]: parseInt(e.target.value)
        }))
    }

    const updateDocument = async (e) => {
        await usersService
            .updateUserRole(e, userId, userRole, setModalObject, setIsModalOpen)
    }

    return (
        <div className="container">

            {isModalOpen ? <ModalTemplate obj={{ modalObject, setIsModalOpen }} /> : false}

            <h1>Редактиране ролята на потребител</h1>
            <div className="form-container">
                <form className={styles["users-form"]}>
                    <label>ID:</label>
                    <input type="text" defaultValue={userId} disabled />
                    <label>Имейл:</label>
                    <input type="text" defaultValue={user.email} disabled />
                    <label htmlFor="role">Стойност на роля - Роля:</label>
                    <select name="role" className="existing-roles" onChange={handleChange}>
                        <option defaultValue={user.role}>
                            {
                                user.role == 0 && '0 - Администратор' ||
                                user.role == 1 && '1 - Модератор' ||
                                user.role == 2 && '2 - Потребител'
                            }
                        </option>
                        {
                            user.role == 0 &&
                            <>
                                <option value={1}>1 - Модератор</option>
                                <option value={2}>2 - Потребител</option>
                            </>
                        }

                        {
                            user.role == 1 &&
                            <>
                                <option value={0}>0 - Администратор</option>
                                <option value={2}>2 - Потребител</option>
                            </>

                        }

                        {
                            user.role == 2 &&
                            <>
                                <option value={0}>0 - Администратор</option>
                                <option value={1}>1 - Модератор</option>
                            </>
                        }
                    </select>

                    <div className={styles.buttons}>
                        <Link to="/crud-documents" className={`button red ${styles.close}`}>Затвори</Link>
                        <button onClick={updateDocument} className={`button orange ${styles.update}`}>Обнови</button>
                    </div>
                </form>
            </div>
        </div>
    )
}