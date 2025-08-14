import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordModal.css';

const PasswordModal = ({ onSuccess, titleKr, titleEn, correctPassword }) => {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const checkPassword = () => {
        if (input === correctPassword) {
            onSuccess();
        } else {
            setError('비밀번호가 올바르지 않습니다.');
        }
    };

    const handleClose = () => {
        navigate('/');
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-box">
                <button className="close-modal-btn" onClick={handleClose}>✕</button>

                <p className="modal-text-kr">{titleKr}</p>
                <p className="modal-text-en">{titleEn}</p>

                <div className="modal-form">
                    <input
                        className="password-input"
                        type="password"
                        placeholder="Enter a password"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && checkPassword()}
                    />
                    {error && <p className="error-msg">{error}</p>}
                    <button className="go-button" onClick={checkPassword}>
                        GO!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PasswordModal;
