import React, { useState } from 'react';
import PasswordModal from "../../components/Data/PasswordModal";

const DataPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <div className="data-page">
            {!isAuthenticated && (
                <PasswordModal onSuccess={handleSuccess} />
            )}
            {isAuthenticated && (
                <div className="content">
                    <h1>DATA</h1>
                </div>
            )}
        </div>
    );
};

export default DataPage;
