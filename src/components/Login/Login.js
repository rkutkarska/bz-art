import React, { useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import "../../styles/LoginRegister.css";

// TODO implement password reset
export const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');

    const { login } = useAuth();

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate('/');

        } catch (error) {
            setError(`Вписването е неуспешно!`);
        }
        setLoading(false);
    }

    return (
        <div className="login-container">
            <div className="login-container__image"></div>
            <div className="login-container__form">
                <h1>Вписване</h1>
                <form className="form" onSubmit={handleSubmit} onChange={() => setError('')}>
                    {error && <p className="error-message fadeOut">{error}</p>}
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" name="email" placeholder="sample@mail.com" ref={emailRef} />
                    <label htmlFor="password">Парола</label>
                    <input id="password" type="password" name="password" placeholder="******" ref={passwordRef} />
                    {
                        loading
                            ? <input className="button red" type="submit" value="Вход" disabled={loading} />
                            : <input className="button yellow" type="submit" value="Вход" disabled={loading} />
                    }

                </form>
                <p className="inline">Нямаш акаунт? </p>
                <Link to="/register">Регистрирай се.</Link>
                <p><Link to="/">Върни ме в началната страница.</Link></p>
            </div>
        </div>
    );
}