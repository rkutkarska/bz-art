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
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" name="email" placeholder="sample@mail.com" />
                    <label htmlFor="password">Парола</label>
                    <input id="password" type="password" name="password" placeholder="******" />
                    <label className="remember-me" htmlFor="remember-me"><input type="checkbox" /> Запомни ме</label>
                    <input className="button yellow" type="submit" name="" value="Вход" />
                </form>
                <p className="inline">Нямате акаунт? </p>
                <Link to="/register">Регистрирайте се</Link>
            </div>
        </div>
    );
}