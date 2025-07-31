import React from 'react';
import './Data.css';

const PPT = () => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = `${process.env.PUBLIC_URL}/files/0818_OT.pdf`;
        link.download = '0818_OT.pdf';
        link.click();
    };

    return (
        <div className="ppt-card">
            <img
                src="/images/ppt-thumbnail.png"
                alt="PPT thumbnail"
                className="ppt-thumbnail"
            />
            <div className="ppt-footer">
                <p>0818_OT ppt 자료</p>
                <button className="download-btn" button onClick={handleDownload}>
                    <img src="/images/download.png" alt="Download" className="download-icon" />
                </button>
            </div>
        </div>
    );
};

export default PPT;
