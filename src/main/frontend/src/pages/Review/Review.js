import React, { useEffect, useState } from 'react';
import {fetchReviews} from "../../api/reviewApi";
import ReviewList from "./ReviewList";
import { Link } from 'react-router-dom';

const Review = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews().then(setReviews);
    }, []);

    return (
        <div>
            <Link to="/review/write">글쓰기</Link>
            <ReviewList reviews={reviews} />

        </div>
    );
};

export default Review;
