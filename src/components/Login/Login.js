import React, { useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import "../../styles/LoginRegister.css";

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
            console.log('loggedin')
            navigate("/");
        } catch (error) {
            setError(`Вписването е неуспешно! Съобщение:  ${error.message} code: + ${error.code}`);
            // TODO modal
        }
        setLoading(false);
    }

    return (
        <div className="login-container">
            <div className="login-container__image"></div>
            <div className="login-container__form">
                <h1>Вписване</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" name="email" placeholder="sample@mail.com" ref={emailRef} />
                    <label htmlFor="password">Парола</label>
                    <input id="password" type="password" name="password" placeholder="******" ref={passwordRef} />
                    <label className="remember-me" htmlFor="remember-me"><input type="checkbox" /> Запомни ме</label>
                    <input className="button yellow" type="submit" name="" value="Вход" disabled={loading} />
                </form>
                <p className="inline">Нямаш акаунт? </p>
                <Link to="/register">Регистрирай се.</Link>
            </div>
        </div>
    );
}