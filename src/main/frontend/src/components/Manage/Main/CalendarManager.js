import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Data/DataManager.css';
import '../Manage.css';

const R2_BASE_URL = 'https://pub-ee85493dc18e4a65aa97ee5157757291.r2.dev';

const CalendarManager = () => {
    const [calendarFile, setCalendarFile] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const fetchFiles = async () => {
        const res = await axios.get('/api/files');
        const files = res.data;

        const calendarImage = files.find(f => f === 'calendar.jpg');
        const moodImage = files.find(f => f === 'calendar_mood.jpg');
        setCalendarFile({
            calendar: calendarImage,
            mood: moodImage,
        });
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleUpload = async () => {
        if (!selectedFile) return;

        const allowedNames = ['calendar.jpg', 'calendar_mood.jpg'];
        if (!allowedNames.includes(selectedFile.name)) {
            alert('calendar.jpg 또는 calendar_mood.jpg 파일만 업로드 가능합니다.');
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
            <p className="calendar-info">
                ※ 파일 이름이 반드시 <strong>calendar.jpg</strong> 또는 <strong>calendar_mood.jpg</strong> 여야 합니다.
            </p>

            <div className="upload-actions">
                <div className="custom-file-upload">
                    <label htmlFor="calendarFileInput">📎 파일 선택</label>
                    <input
                        type="file"
                        id="calendarFileInput"
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
                        <a href={`${R2_BASE_URL}/${calendarFile.calendar}`} target="_blank" rel="noreferrer">
                            {calendarFile.calendar}
                        </a>
                        <button onClick={() => handleDelete(calendarFile.calendar)}>삭제</button>
                    </li>
                )}
                {calendarFile?.mood && (
                    <li>
                        <a href={`${R2_BASE_URL}/${calendarFile.mood}`} target="_blank" rel="noreferrer">
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
