import React, { useEffect, useState } from 'react';
import './File.css';
import axios from 'axios';

const BASE_URL = 'https://pub-ee85493dc18e4a65aa97ee5157757291.r2.dev';

const File = () => {
    const [allFiles, setAllFiles] = useState([]);

    useEffect(() => {
        axios.get('/api/files')
            .then(res => setAllFiles(res.data))
            .catch(err => console.error('파일 목록 불러오기 실패:', err));
    }, []);

    const normalFiles = allFiles.filter(file => file.startsWith('document/'));
    const pptFiles = allFiles.filter(file => file.startsWith('presentation/'));

    const handleDownload = async (filename) => {
        try {
            const res = await axios.get('/api/files/download', {
                params: { key: filename }
            });

            window.location.href = res.data;
        } catch (err) {
            console.error('다운로드 링크 생성 실패:', err);
        }
    };

    const getDownloadBtnClass = (filename) => {
        if (filename.startsWith('presentation/')) return 'presentation';
        if (filename.startsWith('document/')) return 'document';
        return 'normal';
    };


    return (
        <>
            <p className="copyright-warning">
                본 문서는 세종대학교 글로벌버디 활동을 위해 제작된 전용 자료입니다.<br />
                무단 복제, 배포, 공유를 금하며, 사전 허가 없이 외부에 제공하거나 사용하는 것을 금지합니다.
            </p>

            <h2>Document</h2>
            <div className="file-grid">
                {normalFiles
                    .map((file, idx) => (
                        <div key={idx} className="file-btn">
                            <span>{decodeURIComponent(file.split('/')[1])}</span>
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
                                <span>{decodeURIComponent(file.split('/')[1])}</span>
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
