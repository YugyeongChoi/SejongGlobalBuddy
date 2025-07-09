import React from 'react';
import '../../pages/Main/MainPage.css';

function Calendar() {
    return (
        <div className="calendar-wrapper">
            <div className="calendar-content">
                <img
                    src="/images/calendar.jpg"
                    className="calendar-image"
                />
                <img
                    src="/images/calendar_mood.png"
                    className="mood-image"
                />
            </div>
        </div>
    );
}

export default Calendar;
