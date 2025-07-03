// components/Header.js
import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/">
                    <img src="/images/sjgb-logo.png" alt="SJGB Logo" className="logo" />
                </Link>
            </div>

            <nav className="nav-menu">
                <Link to="/data">Data</Link>
                <Link to="/review">Review</Link>
                <Link to="/team">Team</Link>
                <Link to="/faq">Faq</Link>
            </nav>
        </header>
    );
};

export default Header;
