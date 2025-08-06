import React, { useEffect, useState } from 'react';
import './File.css';
import axios from 'axios';

const BASE_URL = 'https://pub-ee85493dc18e4a65aa97ee5157757291.r2.dev';

const File = () => {
    const [allFiles, setAllFiles] = useState([]);
    const previewExtensions = ['.pdf', '.pptx'];

    const getDownloadBtnClass = (filename) => {
        const lower = filename.toLowerCase();
        return lower.endsWith('.pdf') || lower.endsWith('.pptx') ? 'preview' : 'normal';
    };

    useEffect(() => {
        axios.get('/api/files')
            .then(res => setAllFiles(res.data))
            .catch(err => console.error('파일 목록 불러오기 실패:', err));
    }, []);

    const normalFiles = allFiles.filter(
        f => !previewExtensions.some(ext => f.toLowerCase().endsWith(ext))
    );
    const pptFiles = allFiles.filter(
        f => previewExtensions.some(ext => f.toLowerCase().endsWith(ext))
    );

    const handleDownload = (filename) => {
        const url = `${BASE_URL}/${encodeURIComponent(filename)}`;
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
    };

    return (
        <>
            <p className="copyright-warning">
                본 문서는 세종대학교 글로벌버디 활동을 위해 제작된 전용 자료입니다.<br />
                무단 복제, 배포, 공유를 금하며, 사전 허가 없이 외부에 제공하거나 사용하는 것을 금지합니다.
            </p>
            <h2>Document</h2>
            <div className="file-grid">
                {normalFiles.map((file, idx) => (
                    <div key={idx} className="file-btn">
                        <span>{decodeURIComponent(file)}</span>
                        <button
                            className={`download-btn ${getDownloadBtnClass(file)}`}
                            onClick={() => handleDownload(file)}
                        >
                            <img src="/images/download.png" alt="Download" className="download-icon" />
                        </button>
                    </div>
                ))}
            </div>

            {pptFiles.length > 0 && (
                <>
                    <h2>Official Presentation</h2>
                    <div className="file-grid">
                        {pptFiles.map((file, idx) => (
                            <div key={idx} className="file-btn">
                                <span>{decodeURIComponent(file)}</span>
                                <button
                                    className={`download-btn ${getDownloadBtnClass(file)}`}
                                    onClick={() => handleDownload(file)}
                                >
                                    <img src="/images/download.png" alt="Download" className="download-icon" />
                                </button>

                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default File;
