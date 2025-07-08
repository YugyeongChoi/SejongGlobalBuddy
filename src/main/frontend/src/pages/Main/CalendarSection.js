import React from 'react';
import './Main.css';

function CalendarSection() {
    return (
        <div className="calendar-wrapper">
            <h2 className="calendar-title">달력</h2>

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

export default CalendarSection;
