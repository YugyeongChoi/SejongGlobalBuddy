import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewForm from "./ReviewForm";
import {postReview} from "../../api/reviewApi";

const ReviewWrite = () => {
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        try {
            await postReview(formData);
            navigate('/review');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data);
            } else {
                alert('오류가 발생했습니다.');
                console.error(error);
            }
        }
    };

    return (
        <div>
            <h2>리뷰 작성</h2>
            <ReviewForm onSubmit={handleSubmit} />
        </div>
    );
};

export default ReviewWrite;
