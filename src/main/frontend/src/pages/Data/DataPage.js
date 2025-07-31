import React, { useState } from 'react';
import PasswordModal from "../../components/Data/PasswordModal";
import File from "../../components/Data/File";
import PPT from "../../components/Data/PPT";
import './DataPage.css';

const DataPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <div className="data-page">
            {!isAuthenticated && <PasswordModal onSuccess={handleSuccess} />}
            {isAuthenticated && (
                <div className="content">
                    <h2>File</h2>
                    <File />

                    <h2 style={{ marginTop: '40px' }}>PPT</h2>
                    <div className="ppt-grid">
                        {[1, 2, 3, 4].map((_, idx) => (
                            <PPT key={idx} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataPage;
