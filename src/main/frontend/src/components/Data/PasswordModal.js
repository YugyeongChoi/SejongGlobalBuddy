import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './PasswordModal.css';

const PasswordModal = ({onSuccess, onClose}) => {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const checkPassword = () => {
        if (input === 'globalbuddy!') {
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

                <p className="modal-text-kr">이 탭은 글로벌 버디 한국인 부원들만 볼 수 있습니다.</p>
                <p className="modal-text-en">This tab is only available for Global Buddy Korean members.</p>
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
