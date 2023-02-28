import React from "react";
import styles from './PopUpTemplate.module.css';

export const PopUpTemplate = () => {
    const message="test message";

    return (
        <div className="pop-up">
            <p className="pop-up__message">{message}</p>
            {/* {buttons} */}
        </div>
    );
}