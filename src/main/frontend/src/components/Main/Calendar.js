import React from 'react';
import '../../pages/Main/MainPage.css';

function Calendar() {
    return (
        <div className="calendar-wrapper">
            <div className="calendar-content">
                <img
                    src="/images/calendar.jpg"
                    className="calendar-image"
                    onContextMenu={(e) => e.preventDefault()}
                />
                <img
                    src="/images/calendar_mood.png"
                    className="mood-image"
                    onContextMenu={(e) => e.preventDefault()}
                />
            </div>
        </div>
    );
}

export default Calendar;
