import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Calendar() {
    const [calendarImg, setCalendarImg] = useState(null);
    const [moodImg, setMoodImg] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await axios.get('/api/files');
                const files = res.data;

                const calendarFile = files.find(f => f.includes('calendar.jpg'));
                const moodFile = files.find(f => f.includes('calendar_mood.jpg'));

                setCalendarImg(calendarFile);
                setMoodImg(moodFile);
            } catch (err) {
                console.error('이미지 불러오기 실패:', err);
            }
        };

        fetchImages();
    }, []);

    const R2_BASE_URL = 'https://pub-ee85493dc18e4a65aa97ee5157757291.r2.dev';

    return (
        <div className="calendar-wrapper">
            <div className="calendar-content">
                {calendarImg && (
                    <img
                        src={`${R2_BASE_URL}/${encodeURIComponent(calendarImg)}`}
                        className="calendar-image"
                        onContextMenu={(e) => e.preventDefault()}
                    />
                )}
                {moodImg && (
                    <img
                        src={`${R2_BASE_URL}/${encodeURIComponent(moodImg)}`}
                        className="mood-image"
                        onContextMenu={(e) => e.preventDefault()}
                    />
                )}
            </div>
        </div>
    );
}

export default Calendar;
