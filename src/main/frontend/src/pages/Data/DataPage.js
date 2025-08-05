import React, { useState } from 'react';
import PasswordModal from "../../components/Data/PasswordModal";
import File from "../../components/Data/File";
import PPTModal from "../../components/Data/PPTModal";
import './DataPage.css';

const DataPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [previewPDF, setPreviewPDF] = useState(null);

    const handleSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <div className="data-page">
            {!isAuthenticated && <PasswordModal onSuccess={handleSuccess} />}
            {isAuthenticated && (
                <div className="content">
                    <File />
                    {previewPDF && (
                        <PPTModal filePath={previewPDF} onClose={() => setPreviewPDF(null)} />
                    )}

                </div>
            )}
        </div>
    );
};

export default DataPage;
