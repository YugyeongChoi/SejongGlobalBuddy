import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Manage.css';
import './MainManager.css';

const R2_BASE_URL = 'https://pub-ee85493dc18e4a65aa97ee5157757291.r2.dev';

const MainImageManager = () => {
    const [groupImages, setGroupImages] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const isGroupImage = (filename) => /^group[1-5]\.(jpg|png)$/i.test(filename);

    const fetchFiles = async () => {
        try {
            const res = await axios.get('/api/files');
            const files = Array.isArray(res.data) ? res.data : [];

            const filtered = files
                .filter(isGroupImage)
                .sort((a, b) => {
                    const numA = parseInt(a.match(/group(\d+)/i)?.[1], 10);
                    const numB = parseInt(b.match(/group(\d+)/i)?.[1], 10);
                    return numA - numB;
                });

            setGroupImages(filtered);
        } catch (err) {
            console.error('그룹 이미지 불러오기 실패:', err);
        }
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
            alert('그룹 이미지 업로드 성공!');
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
                await axios.delete(`/api/files/${encodeURIComponent(filename)}`);
                fetchFiles();
            } catch (err) {
                console.error('삭제 실패:', err);
            }
        }
    };

    return (
        <div className="calendar-manager">
            <h2>그룹 사진 관리</h2>
            <h3>🖼️ 그룹 사진 업로드</h3>
            <div className="calendar-info">
                <p>※ 파일 이름은 <strong>group1</strong> ~ <strong>group5</strong>이어야 합니다.</p>
                <p>※ <strong>group1</strong>이 메인 이미지입니다.</p>
                <p>※ 확장자는 <strong>jpg</strong> / <strong>JPG</strong> / <strong>png</strong> 형식만 허용됩니다.</p>
            </div>

            <div className="upload-actions">
                <div className="custom-file-upload">
                    <label htmlFor="groupImageInput">📎 파일 선택</label>
                    <input
                        type="file"
                        id="groupImageInput"
                        accept=".jpg,.JPG,.png"
                        style={{ display: 'none' }}
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                    {selectedFile && <span>{selectedFile.name}</span>}
                </div>
                <button onClick={handleUpload} disabled={!selectedFile}>
                    업로드
                </button>
            </div>

            <h3>📁 현재 등록된 그룹 사진</h3>
            <ul>
                {groupImages.map((filename) => (
                    <li key={filename}>
                        <a
                            href={`${R2_BASE_URL}/${encodeURIComponent(filename)}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {filename}
                        </a>
                        <button onClick={() => handleDelete(filename)}>삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MainImageManager;
