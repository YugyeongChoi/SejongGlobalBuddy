import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DataManager.css';
import '../Manage.css';

const DataManager = () => {
    const [fileList, setFileList] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [category, setCategory] = useState('document');

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
        formData.append('category', category);

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
            try {
                await axios.delete('/api/files', {
                    params: { filename }
                });
                fetchFiles();
            } catch (err) {
                console.error('삭제 실패:', err);
                alert('파일 삭제 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className="data-manager">
            <h2>자료 관리</h2>

            <h3>📁 문서 업로드</h3>
            <div className="upload-actions">
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="document">Document</option>
                    <option value="presentation">Official Presentation</option>
                </select>
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
                <ul>
                    {fileList
                        .filter(file => file.startsWith('document/') || file.startsWith('presentation/'))
                        .map((file) => (
                            <li key={file}>
                                <a
                                    href={`https://pub-ee85493dc18e4a65aa97ee5157757291.r2.dev/${encodeURIComponent(file)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {file}
                                </a>
                                <button onClick={() => handleDelete(file)}>삭제</button>
                            </li>
                        ))}
                </ul>

            </ul>
        </div>
    );
};

export default DataManager;
