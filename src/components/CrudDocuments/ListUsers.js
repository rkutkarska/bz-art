import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

import styles from './CrudDocuments.module.css';

export const ListUsers = ({ documents }) => {

    documents.isClicked.current = !documents.isClicked.current;

    return (
        <>
            {
                documents.documents.length > 0
                    ? <>
                        <h2>Списък с наличните потребители</h2>
                        <div className={`${styles.table__header} ${styles.table__row}`}>
                            <div></div>
                            <div>Email</div>
                            <div>Роля</div>
                            <div>Действия</div>
                        </div>
                    </>
                    : <h2 className={styles["no-items"]}>Няма добавени потребители!</h2>
            }

            {
                documents.documents.map((document, index) => (
                    <div key={document.id} className={styles.table__row}>
                        <div>{index + 1}</div>
                        <div>{document.email}</div>
                        <div>
                            {
                                document.role == 0 && 'Администратор' ||
                                document.role == 1 && 'Модератор' ||
                                document.role == 2 && 'Потребител'
                            }
                        </div>

                        <div className={styles.row__actions}>
                            <Link to={`/crud-documents/read-user/${document.id}`} className="button green">
                                <FontAwesomeIcon icon={regular('eye')} className={`${styles.view} ${"fa-icon"}`} />
                                Прегледай
                            </Link>
                            <Link to={`/crud-documents/update-user/${document.id}`} className="button orange">
                                <FontAwesomeIcon icon={regular('pen-to-square')} className="edit fa-icon" />
                                Редактирай
                            </Link>
                        </div>
                    </div>
                ))
            }
        </>
    )
}