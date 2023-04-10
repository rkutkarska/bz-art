import React from "react";
import { Link } from 'react-router-dom';

import styles from './Forbidden.module.css';

export const Forbidden = () => {
    return (
        <div class="container">
            <img className={styles["img-center"]} src={require("../../img/403/403.png")} alt="403 Page not found!" />
            <h1>Forbidden! You are not authorized!</h1>
            <div className={styles["text-center"]}>
                <Link to="/" className="button purple">Към началната страница</Link>
            </div>
        </div>
    );
}