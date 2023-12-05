import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Spinner } from '../../Spinner/Spinner';
import { ModalTemplate } from "../../Modals/ModalTemplate";

import * as usersService from '../../../services/usersService';

import styles from './ReadUser.module.css';

export const ReadUser = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userRole, setUserRole] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalObject, setModalObject] = useState({});

    const { userId } = useParams();

    let roleName = '';

    useEffect(() => {
        usersService.getUserRole(userId, setIsModalOpen, setModalObject)
            .then((role) => {
                setUserRole(role)
                setIsLoading(false);
            });
    }, [])

    useEffect(() => {
        usersService.getUserEmail(userId)
            .then((mail) => {
                setUserEmail(mail)
            });
    }, [userId]);

    console.log('User Email:', userEmail);


    if (userRole.role == 0) {
        roleName = 'Администратор';
    } else if (userRole.role == 1) {
        roleName = 'Модератор';
    } else {
        roleName = 'Обикновен потребител';
    }

    return (
        <div className={`${styles.read} container`}>
            {
                isLoading
                    ? <Spinner />
                    : <>
                        {isModalOpen ? <ModalTemplate obj={{ modalObject, setIsModalOpen }} /> : false}

                        <h1>Преглед на потребител</h1>
                        <div className="form-container">
                            <form className={styles["materials-form"]}>
                                <label>ID:</label>
                                <input type="text" defaultValue={userId} disabled />
                                <label>Роля</label>
                                <input type="text" defaultValue={userRole.role} disabled />
                                <label>Наименование на ролята</label>
                                <input type="text" defaultValue={roleName} disabled />
                                <label>Имейл</label>
                                <input type="text" defaultValue={userEmail} disabled />
                                <Link to="/crud-documents" className="button red">Затвори</Link>
                            </form>
                        </div>
                    </>
            }
        </div>
    )
}