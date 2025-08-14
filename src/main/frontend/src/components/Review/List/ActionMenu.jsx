import React, { useState } from 'react';
import './ActionMenu.css';

const ActionMenu = ({ isOpen, setOpen, onSubmitPassword, onReport }) => {
    const [step, setStep] = useState('menu');
    const [actionType, setActionType] = useState(null);
    const [password, setPassword] = useState('');

    const handleActionClick = (type) => {
        setActionType(type);
        setStep('password');
    };

    const handleReportClick = async () => {
        if (typeof onReport === 'function') {
            onReport();
        }
    };

    const handlePasswordSubmit = (e) => {
        e.stopPropagation();
        onSubmitPassword(password, actionType);
        console.log('password:', password);
        console.log('actionType:', actionType);

        setPassword('');
        setStep('menu');
        setOpen(false);
    };

    const handleBack = () => {
        setStep('menu');
        setPassword('');
    };


    return (
        <div className="review-edit-container" onClick={(e) => e.stopPropagation()}>
            <button className="review-edit-dots" onClick={(e) => { e.stopPropagation(); setOpen(!isOpen); }}>
                ⋮
            </button>

            {isOpen && (
                <div className="review-edit-popup" onClick={(e) => e.stopPropagation()}>
                    {step === 'menu' ? (
                        <>
                            <button onClick={() => handleActionClick('edit')}>Edit</button>
                            <button onClick={() => handleActionClick('delete')}>Delete</button>
                            <button className="report-button" onClick={handleReportClick}>
                                {/*<img src="/icons/report-icon.svg" alt="Report" className="report-icon" />*/}
                                Report
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                type="password"
                                placeholder="Enter the password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="popup-actions">
                                <button onClick={handleBack}>Back</button>
                                <button onClick={handlePasswordSubmit}>OK</button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ActionMenu;


