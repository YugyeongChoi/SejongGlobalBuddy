import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Data/DataManager.css';
import '../Manage.css';

const R2_BASE_URL = 'https://pub-ee85493dc18e4a65aa97ee5157757291.r2.dev';

const CalendarManager = () => {
    const [calendarFile, setCalendarFile] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const pickPreferred = (files, base) => {
        const candidates = files.filter((f) =>
            new RegExp(`^${base}\\.(jpg|png)$`, 'i').test(f)
        );
        const order = { png: 0, jpg: 1 };
        candidates.sort((a, b) => {
            const extA = a.split('.').pop().toLowerCase();
            const extB = b.split('.').pop().toLowerCase();
            return (order[extA] ?? 9) - (order[extB] ?? 9);
        });
        return candidates[0] || null;
    };

    const fetchFiles = async () => {
        const res = await axios.get('/api/files');
        const files = Array.isArray(res.data) ? res.data : [];
        setCalendarFile({
            calendar: pickPreferred(files, 'calendar'),
            mood: pickPreferred(files, 'calendar_mood'),
        });
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleUpload = async () => {
        if (!selectedFile) return;

        const validName = /^(calendar|calendar_mood)\.(jpg|png)$/i.test(selectedFile.name);
        if (!validName) {
            alert('calendar.jpg | calendar.png | calendar_mood.jpg | calendar_mood.png 파일만 업로드 가능합니다.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            await axios.post('/api/files/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('달력 이미지 업로드 성공!');
            setSelectedFile(null);
            fetchFiles();
        } catch (err) {
            console.error('달력 이미지 업로드 실패:', err);
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
            <h2>메인 관리</h2>
            <h3>🗓️ 달력 이미지 업로드</h3>
            <div className="calendar-info">
                <p>※ 이미지 이름은 <strong>calendar</strong> 또는 <strong>calendar_mood</strong> 이어야 합니다.</p>
                <p>※ 확장자는 <strong>jpg</strong> / <strong>JPG</strong> / <strong>png</strong> 형식만 허용됩니다.</p>
            </div>

            <div className="upload-actions">
                <div className="custom-file-upload">
                    <label htmlFor="calendarFileInput">📎 파일 선택</label>
                    <input
                        type="file"
                        id="calendarFileInput"
                        accept=".jpg,.JPG,.png"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                    {selectedFile && <span>{selectedFile.name}</span>}
                </div>
                <button onClick={handleUpload} disabled={!selectedFile}>
                    업로드
                </button>
            </div>

            <h3>🖼️ 현재 등록된 달력 이미지</h3>
            <ul>
                {calendarFile?.calendar && (
                    <li>
                        <a
                            href={`${R2_BASE_URL}/${encodeURIComponent(calendarFile.calendar)}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {calendarFile.calendar}
                        </a>
                        <button onClick={() => handleDelete(calendarFile.calendar)}>삭제</button>
                    </li>
                )}
                {calendarFile?.mood && (
                    <li>
                        <a
                            href={`${R2_BASE_URL}/${encodeURIComponent(calendarFile.mood)}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {calendarFile.mood}
                        </a>
                        <button onClick={() => handleDelete(calendarFile.mood)}>삭제</button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default CalendarManager;
