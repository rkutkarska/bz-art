import React from 'react';
import styles from './Spinner.module.css';

export const Spinner = () => {
    return (
        <>
            <div className={styles["lds-roller"]}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p className={styles.message}>Loading... Please wait!</p>
        </>
    );
};