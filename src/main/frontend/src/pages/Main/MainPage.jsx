import React, { useState, useEffect } from 'react';
import './MainPage.css';
import ImageSwitcher from '../../components/Main/ImageSwitcher';
import ReviewPhotoGrid from "../../components/Main/ReviewPhotoGrid";
import Calendar from '../../components/Main/Calendar';

function MainPage() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('/api/review')
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(err => console.error('리뷰 불러오기 실패:', err));
    }, []);

    return (
        <>
            <ImageSwitcher />
            <ReviewPhotoGrid reviews={reviews} />
            <Calendar />
        </>
    );
}

export default MainPage;
