import React, { useEffect, useState } from 'react';
import {fetchReviews} from "../../api/reviewApi";
import ReviewList from "./List/ReviewList";
import { Link } from 'react-router-dom';
import { FiEdit3 } from "react-icons/fi";
import './ReviewWrite.css';

const Review = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews().then(setReviews);
    }, []);

    return (
        <div>
            <ReviewList reviews={reviews} />

            <Link to="/review/write" className="fab-button">
                <FiEdit3 size={28} />
            </Link>
        </div>
    );
};

export default Review;
