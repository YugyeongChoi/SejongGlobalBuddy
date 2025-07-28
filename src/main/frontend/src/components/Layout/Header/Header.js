import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    }, [menuOpen]);

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
                <Link to="/faq">FAQ</Link>
            </nav>

            <div
                className={`hamburger ${menuOpen ? 'hide' : ''}`}
                onClick={() => setMenuOpen(true)}
            >
                ☰
            </div>

            <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
                <div className="close-btn" onClick={() => setMenuOpen(false)}>✕</div>
                <Link to="/data" onClick={() => setMenuOpen(false)}>Data</Link>
                <Link to="/review" onClick={() => setMenuOpen(false)}>Review</Link>
                <Link to="/team" onClick={() => setMenuOpen(false)}>Team</Link>
                <Link to="/faq" onClick={() => setMenuOpen(false)}>FAQ</Link>

                <div className="side-menu-footer">
                    <div className="side-menu-background-text">
                        <div className="line">SEJONG</div>
                        <div className="line">GLOBAL BUDDY</div>
                    </div>
                    <img src="/logo.png" alt="logo" className="side-menu-image" />
                </div>
            </div>

            {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
        </header>
    );
};

export default Header;
