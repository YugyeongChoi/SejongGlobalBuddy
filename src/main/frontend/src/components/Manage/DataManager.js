import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DataManager.css';

const DataManager = () => {
    const [fileList, setFileList] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const fetchFiles = async () => {
        const res = await axios.get('/api/files');
        setFileList(res.data);
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            await axios.post('/api/files/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('업로드 성공!');
            setSelectedFile(null);
            fetchFiles();
        } catch (err) {
            console.error('업로드 실패:', err);
            alert('업로드 실패');
        }
    };

    const handleDelete = async (filename) => {
        if (window.confirm(`${filename} 파일을 삭제하시겠습니까?`)) {
            await axios.delete(`/api/files/${encodeURIComponent(filename)}`);
            fetchFiles();
        }
    };

    return (
        <div className="data-manager">
            <h3>📁 자료 업로드</h3>
            <div className="upload-actions">
                <div className="custom-file-upload">
                    <label htmlFor="fileInput">📎 파일 선택</label>
                    <input
                        type="file"
                        id="fileInput"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                    {selectedFile && <span>{selectedFile.name}</span>}
                </div>
                <button onClick={handleUpload} disabled={!selectedFile}>
                    업로드
                </button>
            </div>

            <h3>📄 업로드된 파일 목록</h3>
            <ul>
                {fileList.map((file) => (
                    <li key={file}>
                        <a href={`https://pub-ee85493dc18e4a65aa97ee5157757291.r2.dev/${encodeURIComponent(file)}`} target="_blank" rel="noreferrer">
                            {file}
                        </a>
                        <button onClick={() => handleDelete(file)}>삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DataManager;
