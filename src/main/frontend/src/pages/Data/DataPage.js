import React, { useState } from 'react';
import PasswordModal from "../../components/Data/PasswordModal";
import File from "../../components/Data/File";
import PPT from "../../components/Data/PPT";
import PPTModal from "../../components/Data/PPTModal";
import PPTData from "../../components/Data/files/PPTData";
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
                    <h2>File</h2>
                    <File />

                    <h2 style={{ marginTop: '40px' }}>PPT</h2>
                    <div className="ppt-grid">
                        {PPTData.map((file, idx) => (
                            <PPT key={idx} file={file} onPreview={(path) => setPreviewPDF(path)} />
                        ))}
                    </div>
                    {previewPDF && (
                        <PPTModal filePath={previewPDF} onClose={() => setPreviewPDF(null)} />
                    )}

                </div>
            )}
        </div>
    );
};

export default DataPage;
