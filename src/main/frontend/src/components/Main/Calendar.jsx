import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Calendar() {
    const [calendarImg, setCalendarImg] = useState(null);
    const [moodImg, setMoodImg] = useState(null);
    const [loadedCalendar, setLoadedCalendar] = useState(false);
    const [loadedMood, setLoadedMood] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await axios.get('/api/files');
                const files = res.data;

                const calendarFile = files.find(f =>
                    f.toLowerCase().match(/calendar\.(jpg|png)$/)
                );
                const moodFile = files.find(f =>
                    f.toLowerCase().match(/calendar_mood\.(jpg|png)$/)
                );

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
                        src={`${R2_BASE_URL}/${encodeURIComponent(calendarImg)}?v=${Date.now()}`}
                        className="calendar-image"
                        onLoad={() => setLoadedCalendar(true)}
                        style={{
                            opacity: loadedCalendar ? 1 : 0,
                            transition: 'opacity 0.8s ease-in-out',
                        }}
                        onContextMenu={(e) => e.preventDefault()}
                        alt="Calendar"
                    />
                )}
                {moodImg && (
                    <img
                        src={`${R2_BASE_URL}/${encodeURIComponent(moodImg)}?v=${Date.now()}`}
                        className="mood-image"
                        onLoad={() => setLoadedMood(true)}
                        style={{
                            opacity: loadedMood ? 1 : 0,
                            transition: 'opacity 0.8s ease-in-out',
                        }}
                        onContextMenu={(e) => e.preventDefault()}
                        alt="Mood"
                    />
                )}
            </div>
        </div>
    );
}

export default Calendar;
