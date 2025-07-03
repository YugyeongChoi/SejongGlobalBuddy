import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="social-footer">
            <h2>SJGB</h2>
            <p>
                <span className="highlight">SE</span>JONG <span className="highlight">G</span>lobal <span className="highlight">B</span>uddy
            </p>
            <p>Check Out Our Other Social Media Channels By Clicking The Icons!</p>

            <div className="social-icons">
                <a href="https://www.instagram.com/sejongglobalbuddy/" target="_blank" rel="noopener noreferrer">
                    <img src="/images/instagram.png" alt="Instagram" />
                </a>
                <a href="https://www.youtube.com/@globalbuddyofficial2513" target="_blank" rel="noopener noreferrer">
                    <img src="/images/youtube.png" alt="YouTube" />
                </a>
                <a href="mailto:globalbuddy23@gmail.com">
                    <img src="/images/email.png" alt="Email" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
