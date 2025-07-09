import React, { useEffect, useState } from 'react';
import {fetchReviews} from "../../api/reviewApi";
import List from "../../components/Review/List/List";
import { Link } from 'react-router-dom';
import { FiEdit3 } from "react-icons/fi";
import './Write/WritePage.css';
import './ReviewPage.css';

const ReviewPage = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews().then(setReviews);
    }, []);

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
