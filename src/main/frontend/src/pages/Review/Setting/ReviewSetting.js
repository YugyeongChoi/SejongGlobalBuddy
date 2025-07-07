import React, { useState } from 'react';
import './ReviewSetting.css';

const ReviewSetting = ({ onPasswordSubmit, isOpen, setOpen }) => {
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.stopPropagation();
        onPasswordSubmit(password);
        setPassword('');
        setOpen(false);
    };

    const handleButtonClick = (e) => {
        e.stopPropagation();
        setOpen(!isOpen);
    };

    return (
        <div className="review-edit-container" onClick={(e) => e.stopPropagation()}>
            <button className="review-edit-dots" onClick={handleButtonClick}>⋯</button>

            {isOpen && (
                <div className="review-edit-popup" onClick={(e) => e.stopPropagation()}>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleSubmit}>OK</button>
                </div>
            )}
        </div>
    );
};

export default ReviewSetting;
