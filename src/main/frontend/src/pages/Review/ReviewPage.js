import React, { useEffect, useState } from 'react';
import {fetchReviews} from "../../api/reviewApi";
import List from "../../components/Review/List/List";
import { Link } from 'react-router-dom';
import { FiEdit3 } from "react-icons/fi";
import './Write/WritePage.css';
import './ReviewPage.css';
import { useLocation } from 'react-router-dom';

const ReviewPage = () => {
    const [reviews, setReviews] = useState([]);
    const location = useLocation();

    useEffect(() => {
        fetchReviews().then(setReviews);
    }, []);

    useEffect(() => {
        if (location.state?.fromForm) {
            fetchReviews().then(setReviews);
        }
    }, [location.state]);

    return (
        <div className="review-page">
            <h1>Global Buddy Review</h1>
            <List reviews={reviews} />

            <Link to="/review/write" className="fab-button">
                <FiEdit3 color="white" size={28} />
            </Link>
        </div>
    );
};

export default ReviewPage;
