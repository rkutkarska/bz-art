import { useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import * as userService from '../../services/usersService';

import "./LoginRegister.css";

export const Register = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const repeatPasswordRef = useRef();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');

    const [emailHasError, setEmailHasError] = useState(false);
    const [passwordHasError, setPasswordHasError] = useState(false);
    const [repeatPasswordHasError, setRepeatPasswordHasError] = useState(false);

    const { register } = useAuth();

    const navigate = useNavigate();

    const validateEmail = () => {
        let emailPattern = new RegExp(/^[a-zA-Z0-9\.\-_]{2,}@[a-zA-Z\-0-9]{2,}.[a-zA-Z]{2,}$/);

        if (!emailPattern.test(emailRef.current.value)) {
            setEmailHasError(true);
        } else {
            setEmailHasError(false);
        }
    }

    const validatePassword = () => {
        if (passwordRef.current.value.length < 6) {
            setPasswordHasError(true);
        } else {
            setPasswordHasError(false);
        }
    }

    const validateRepeatPassword = () => {
        if (passwordRef.current.value !== repeatPasswordRef.current.value) {
            setRepeatPasswordHasError(true);
        } else {
            setRepeatPasswordHasError(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        let emailPattern = new RegExp(/^[a-zA-Z0-9\.\-_]{2,}@[a-zA-Z\-0-9]{2,}.[a-zA-Z]{2,}$/);
        if (passwordRef.current.value !== repeatPasswordRef.current.value) {
            return setError('Паролите не съвпадат!');
        }

        if (!emailPattern.test(emailRef.current.value)) {
            setEmailHasError(true);
            return setError('Невалиден имейл адрес!');
        }

        try {
            setError('');
            setLoading(true);
            await register(emailRef.current.value, passwordRef.current.value)
                .then((res) => {
                    userService.saveUserData(res, emailRef.current.value);
                })

            navigate("/");
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError(`Вече има регистрация с този email: ${emailRef.current.value}!`);
                    break;
                case 'auth/invalid-email':
                    setError(`Email адреса ${emailRef.current.value} е невалиден!`);
                    break;
                case 'auth/operation-not-allowed':
                    setError(`Грешка по време на регистрация!`);
                    break;
                case 'auth/weak-password':
                    setError('Паролата трябва да бъде поне 6 символа!');
                    break;
                default:
                    setError(`Регистрацията е неуспешна!`);
                    break;
            }
        }

        setLoading(false);
    }

    return (
        <div className="register-container">
            <div className="register-container__image"></div>
            <div className="register-container__form">
                <h1>Регистрация</h1>
                <form className="form" onSubmit={handleSubmit} onChange={() => setError('')} >
                    {error && <p className="error-message fadeOut">{error}</p>}
                    <label htmlFor="email">Email</label>
                    <input
                        className={emailHasError ? "error" : undefined}
                        id="email"
                        type="text"
                        name="email"
                        ref={emailRef}
                        placeholder="sample@mail.com"
                        required
                        onBlur={validateEmail}
                    />

                    {emailHasError && <p className="form-error">Посоченият email адрес е невалиден!</p>}

                    <label htmlFor="password">Парола</label>
                    <input
                        className={passwordHasError ? "error" : undefined}
                        id="password"
                        type="password"
                        name="password"
                        ref={passwordRef}
                        placeholder="******"
                        required
                        onBlur={validatePassword}
                    />
                    {passwordHasError && <p className="form-error">Паролата трябва да бъде поне 6 символа!</p>}

                    <label htmlFor="repeat-password">Повторете паролата</label>
                    <input
                        className={repeatPasswordHasError ? "error" : undefined}
                        id="repeat-password"
                        type="password"
                        name="repeat-password"
                        ref={repeatPasswordRef}
                        placeholder="******"
                        required
                        onBlur={validateRepeatPassword}
                    />

                    {repeatPasswordHasError && <p className="form-error">Паролите не съвпадат!</p>}

                    {
                        loading
                            ? <input className="button red" type="submit" value="Регистрирай ме" disabled={loading} />
                            : <input className="button yellow" type="submit" value="Регистрирай ме" disabled={loading} />
                    }
                </form>
                <p className="inline">Вече имаш акаунт? <Link to="/login">Вход</Link></p>
                <p><Link to="/">Върни ме в началната страница.</Link></p>
            </div>
        </div>
    );
}