import React from 'react';
import '../styles/Header.css';

import { HeaderInfo } from './HeaderInfo';
import { HeaderItems } from './HeaderItems';
import { Navigation } from './Navigation';
import { Hero } from './Hero';

export const Header = () => {
    return (
        <header className="header">
            <HeaderInfo />
            <HeaderItems />
            <Navigation />
            <Hero />
        </header>
    );
}