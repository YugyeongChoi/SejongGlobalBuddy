import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewForm from "./ReviewForm";
import {postReview} from "../../api/reviewApi";

const ReviewWrite = () => {
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        await postReview(formData);
        navigate('/review');
    };

    return (
        <div>
            <h2>리뷰 작성</h2>
            <ReviewForm onSubmit={handleSubmit} />
        </div>
    );
};

export default ReviewWrite;
