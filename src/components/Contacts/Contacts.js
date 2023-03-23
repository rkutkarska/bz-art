import React from "react";
import styles from './Contacts.module.css';

export const Contacts = () => {
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

                    {/* TODO implement send email */}
                    {/* https://onboarding.sendinblue.com/account/register */}
                    <div className={styles.form}>
                        <h2>Пишете ни!</h2>
                        <p>Вашето мнение е ценно за нас. Споделете ни го, а ние ще се свържем с Вас при първа възможност.</p>
                        <form>
                            <label htmlFor="user-name">Имена</label>
                            <input type="text" id="user-name" placeholder="Три имена" />
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" placeholder="example@email.bg" />
                            <label htmlFor="phone">Телефон</label>
                            <input type="text" id="phone" placeholder="Телефонен номер" />
                            <label htmlFor="message">Съобщение</label>
                            <textarea name="message" id="message" rows="5" placeholder="Вашето съобщение"></textarea>
                            <div className="buttons">
                                <button className="button green large">Изпрати</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}