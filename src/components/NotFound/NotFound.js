import React from "react"
import { Link } from "react-router-dom"

import styles from './NotFound.module.css';

export const NotFound = () => {
    return (
        <div>
            <img className={styles["img-center"]} src={require("../../img/404/404.png")} />
            <h1>Page not found!</h1>
            <div className={styles["text-center"]}>
                <p>Ами сега? Страницата, която търсиш не съществува!</p>
                <Link to="/" class="button purple">Към началната страница</Link>
            </div>
        </div>
    )
}