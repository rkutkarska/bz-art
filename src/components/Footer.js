import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useLocation } from "react-router-dom";
import '../styles/Footer.css';

export const Footer = () => {
    const { pathname } = useLocation();

    return (
        <>
            {
                (pathname === '/login' || pathname === '/register')
                    ? null
                    : <footer>
                        <svg
                            className="wave"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1440 320"
                        >
                            <path
                                fill="#FBF7F9"
                                fillOpacity={1}
                                d="M0,96L48,101.3C96,107,192,117,288,138.7C384,160,480,192,576,176C672,160,768,96,864,69.3C960,43,1056,53,1152,74.7C1248,96,1344,128,1392,144L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                            ></path>
                        </svg>
                        <div>
                            <p>&copy; Studio BZ Art 2023</p>
                            <p>Programming & Design: Ralena Kutkarska</p>
                            <p>Made with &nbsp;
                                <FontAwesomeIcon icon={solid('heart')} className="heart"></FontAwesomeIcon>
                            </p>
                        </div>
                    </footer>
            }
        </>
    );
}