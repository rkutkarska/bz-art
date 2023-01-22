import React from 'react';
import { HeaderInfo } from './HeaderInfo';
import { HeaderItems } from './HeaderItems';

export const Header = () => {
    return (
        <header className="header">
            <HeaderInfo />
            <HeaderItems />
        </header>
    );
}