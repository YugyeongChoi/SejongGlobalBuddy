import React from 'react';
import './Data.css';
import files from "./files/FileData";

const BASE_URL = 'https://pub-ee85493dc18e4a65aa97ee5157757291.r2.dev';

const File = () => {
    const handleDownload = (filename) => {
        const url = `${BASE_URL}/${encodeURIComponent(filename)}`;
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
    };

    return (
        <div className="file-grid">
            {files.map((file, idx) => (
                <div key={idx} className="file-btn">
                    <span>{file.label}</span>
                    <button className="download-btn" onClick={() => handleDownload(file.path)}>
                        <img src="/images/download.png" alt="Download" className="download-icon" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default File;
