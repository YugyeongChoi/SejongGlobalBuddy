import React from 'react';
import './MainPage.css';
import ImageSwitcher from '../../components/Main/ImageSwitcher';
import Calendar from '../../components/Main/Calendar';

function MainPage() {
    return (
        <>
            <ImageSwitcher />
            <Calendar />
        </>
    );
}

export default MainPage;
