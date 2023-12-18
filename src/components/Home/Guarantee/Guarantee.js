import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import yellow_blob from '../../../img/blobs/first-blob.svg';
import purple_blob from '../../../img/blobs/second-blob.svg';
import styles from './Guarantee.module.css';

export const Guarantee = () => {
    return (
        <article className={styles.guarantee}>
            <h1 className="caption">Ако ни се доверите ще получите:</h1>
            <section className={styles.guarantee__article}>
                <ul className={`${styles.guarantee__list} ul-clear`}>
                    <li>
                        <div className={styles.blob}>
                            <img className={styles.blob__yellow} src={yellow_blob} alt="yellow blob" />
                            <img className={styles.blob__purple} src={purple_blob} alt="purple blob" />
                            <FontAwesomeIcon icon={solid('gem')} className={styles.icon}></FontAwesomeIcon>
                        </div>
                        <p>100% ръчна изработка, получавате бутиково бижу.</p>
                    </li>
                    <li>
                        <div className={styles.blob}>
                            <img className={styles.blob__yellow} src={yellow_blob} alt="yellow blob" />
                            <img className={styles.blob__purple} src={purple_blob} alt="purple blob" />
                            <FontAwesomeIcon icon={solid('thumbs-up')} className={styles.icon}></FontAwesomeIcon>
                        </div>
                        <p>Качество без компромиси.</p>
                    </li>
                    <li>
                        <div className={styles.blob}>
                            <img className={styles.blob__yellow} src={yellow_blob} alt="yellow blob" />
                            <img className={styles.blob__purple} src={purple_blob} alt="purple blob" />
                            <FontAwesomeIcon icon={solid('truck')} className={styles.icon}></FontAwesomeIcon>
                        </div>
                        <p>Доставка в рамките на 24 часа от поръчката.</p>
                    </li>
                    <li>
                        <div className={styles.blob}>
                            <img className={styles.blob__yellow} src={yellow_blob} alt="yellow blob" />
                            <img className={styles.blob__purple} src={purple_blob} alt="purple blob" />
                            <FontAwesomeIcon icon={solid('heart')} className={styles.icon}></FontAwesomeIcon>
                        </div>
                        <p>Внимание в детайлите, защото обичаме работата си.</p>
                    </li>
                    <li>
                        <div className={styles.blob}>
                            <img className={styles.blob__yellow} src={yellow_blob} alt="yellow blob" />
                            <img className={styles.blob__purple} src={purple_blob} alt="purple blob" />
                            <FontAwesomeIcon icon={solid('hand-holding-heart')} className={styles.icon}></FontAwesomeIcon>
                        </div>
                        <p>Изработка изцяло по Ваш вкус.</p>
                    </li>
                </ul>
            </section>
        </article>
    );
}