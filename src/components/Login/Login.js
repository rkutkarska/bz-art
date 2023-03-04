import React from "react";
import {Link } from 'react-router-dom';
import "../../styles/LoginRegister.css";

export const Login = () => {
    return (
        <div className="login-container">
            <div className="login-container__image"></div>
            <div className="login-container__form">
                <h1>Вписване</h1>
                <form class="form">
                    <label htmlFor="username">Потребител</label>
                    <input type="text" name="username" />
                    <label htmlFor="password">Парола</label>
                    <input type="password" name="password" />
                    <label className="remember-me" htmlFor="remember-me"><input type="checkbox" /> Запомни ме</label>
                    <input className="button yellow" type="submit" name="" value="Вход" />
                </form>
                <p className="inline">Нямате акаунт? </p>
                <Link to="/register">Регистрирайте се</Link>
            </div>
        </div>
    );
}