import React from 'react';
import '../styles/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

export const HeaderInfo = () => {
    return (
        <div className="header__info">
            <p className="location"><a href="https://goo.gl/maps/wyrdQZtLAsJGPaxs8"><FontAwesomeIcon icon={solid('location-dot')} className="fa-icon" />гр. Сливен, бул. "Цар Освободител" 0</a>
            </p>
            <p className="phone"><a href="tel:+35912346789"><FontAwesomeIcon icon={solid('phone')} className="fa-icon" />+359 1234 6789</a></p>
            <p className="email"><a href="mailto:sales@bz-art.com"><FontAwesomeIcon icon={solid('envelope')} className="fa-icon" />sales@bz-art.com</a></p>
            <p className="social-media">Последвай ни:&nbsp;
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={brands('facebook')} className="fa-icon"/></a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={brands('instagram')} className="fa-icon"/></a>
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={brands('youtube')} className="fa-icon"/></a>
            </p>
        </div>
    );
}