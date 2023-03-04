import React from "react";
import {Link } from 'react-router-dom';
import "../../styles/LoginRegister.css";

export const Register = () => {
    return (
        <div className="register-container">
            <div className="register-container__image"></div>
            <div className="register-container__form">
                <h1>Регистрация</h1>
                <form className="form">
                    <label htmlFor="username">Потребител</label>
                    <input type="text" name="username" />
                    <label htmlFor="password">Парола</label>
                    <input type="password" name="password" />
                    <label htmlFor="repeat-password">Повторете паролата</label>
                    <input type="password" name="repeat-password" />
                    <input className="button yellow" type="submit" value="Регистрирай ме" />
                </form>
                <p className="inline">Вече имате акаунт? </p>
                <Link to="/login">Вход</Link>
            </div>
        </div>
    );
}