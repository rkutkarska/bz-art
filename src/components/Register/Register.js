import React, { useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import "../../styles/LoginRegister.css";

export const Register = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const repeatPasswordRef = useRef();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');

    const { register } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== repeatPasswordRef.current.value) {
            return setError('Паролите не съвпадат!');
            // TODO modal
        }

        try {
            setError('');
            setLoading(true);
            await register(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch (error) {
            setError(`Регистрацията е неуспешна! Съобщение: ${error.message} code: ${error.code}`);
            // TODO modal
        }
        setLoading(false);
    }

    return (
        // TODO padding!
        <div className="register-container">
            <div className="register-container__image"></div>
            {error ? <p>{error}</p> : null}
            {/* TODO modal */}
            <div className="register-container__form">
                <h1>Регистрация</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Потребител</label>
                    <input id="username" type="text" name="username" ref={emailRef} required />
                    <label htmlFor="password">Парола</label>
                    <input id="password" type="password" name="password" ref={passwordRef} required />
                    <label htmlFor="repeat-password">Повторете паролата</label>
                    <input id="repeat-password" type="password" name="repeat-password" ref={repeatPasswordRef} required />

                    <input className="button yellow" type="submit" value="Регистрирай ме" disabled={loading} />
                </form>
                <p className="inline">Вече имате акаунт? </p>
                <Link to="/login">Вход</Link>
            </div>
        </div>
    );
}