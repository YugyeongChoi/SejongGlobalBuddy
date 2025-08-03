import React from 'react';
import './Data.css';

const BASE_URL = 'https://pub-ee85493dc18e4a65aa97ee5157757291.r2.dev';

const PPT = ({ file, onPreview }) => {
    const fileUrl = `${BASE_URL}/${encodeURIComponent(file.path)}`;

    return (
        <div className="ppt-item">
            <div className="ppt-info">
                <span className="ppt-label">{file.label}</span>
                <span className="ppt-date">{file.date}</span>
            </div>

            <button
                className="download-btn"
                onClick={() => {
                    const link = document.createElement('a');
                    link.href = fileUrl;
                    link.download = file.path;
                    link.click();
                }}
            >
                <img src="/images/download.png" alt="Download" className="download-icon" />
            </button>
        </div>
    );
};

export default PPT;
