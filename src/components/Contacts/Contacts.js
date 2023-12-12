import { useState } from "react";
import styles from './Contacts.module.css';
import * as contactsService from "../../services/contactsService";



export const Contacts = () => {

    const [nameHasError, setNameHasError] = useState('');
    const [emailHasError, setEmailHasError] = useState('');
    const [phoneHasError, setPhoneHasError] = useState('');
    const [messageHasError, setMessageHasError] = useState('');

    const handleChange = (e) => {
        // TODO implement send email
        // https://onboarding.sendinblue.com/account/register
    }

    return (
        <>
            <div className="container">
                <h1>Контакти</h1>
                <div className={styles.contacts}>
                    <iframe className={styles.container__map}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.1111603756312!2d26.320226200000004!3d42.6801876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a62743c51ad489%3A0x4c5d88263f077931!2z0LHRg9C7LiDigJ7QptCw0YAg0J7RgdCy0L7QsdC-0LTQuNGC0LXQu-KAnCwg0KHQu9C40LLQtdC9INCm0LXQvdGC0YrRgCwg0KHQu9C40LLQtdC9!5e0!3m2!1sbg!2sbg!4v1679561586515!5m2!1sbg!2sbg"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                    <div>
                        <form className={styles.container__form} onChange={handleChange}>
                            <b>Ако имаш въпроси, пиши ни! Нашият екип ще се свърже с теб при първа възможност.</b>
                            <label htmlFor="name">Имена</label>
                            <input onBlur={(e) => contactsService.validateName(e, setNameHasError)} type="text" id="name" placeholder="Три имена" />
                            {nameHasError && <p className="form-error">Името трябва да е с дължина от поне 3 символа!</p>}

                            <label htmlFor="email">Email</label>
                            <input onBlur={(e) => contactsService.validateEmail(e, setEmailHasError)} type="text" id="email" placeholder="example@email.bg" />
                            {emailHasError && <p className="form-error">Посоченият email адрес е невалиден!</p>}

                            <label htmlFor="phone">Телефон</label>
                            <input onBlur={(e) => contactsService.validatePhone(e, setPhoneHasError)} type="text" id="phone" placeholder="0XXXXXXXXX" />
                            {phoneHasError && <p className="form-error">Телефонният номер е невалиден!</p>}

                            <label htmlFor="message">Съобщение</label>
                            <textarea onBlur={(e) => contactsService.validateMessage(e, setMessageHasError)} name="message" id="message" rows="5" placeholder="Вашето съобщение (от 20 до 500 символа)"></textarea>
                            {messageHasError && <p className="form-error">Дължината на съобщението е невалидна!</p>}

                            <div className="buttons">
                                <button onClick={(e) => e.preventDefault()} className="button green same-size-large">Изпрати</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}