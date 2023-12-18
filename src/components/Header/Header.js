import { useLocation } from "react-router-dom";
import { HeaderInfo } from './HeaderInfo';
import { HeaderItems } from './HeaderItems';
import { Navigation } from './Navigation';

import styles from './Header.module.css';

export const Header = () => {
    const { pathname } = useLocation();

    return (
        <>
            {
                (pathname === '/login' || pathname === '/register')
                    ? null
                    : <header className="header">
                        <HeaderInfo />
                        <HeaderItems />
                        <Navigation />
                    </header >
            }
        </>
    );
}