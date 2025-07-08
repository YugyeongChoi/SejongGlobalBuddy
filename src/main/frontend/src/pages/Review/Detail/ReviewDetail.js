import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {getReviewDetail} from '../../../api/reviewApi';
import './ReviewDetail.css';

const ReviewDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [review, setReview] = useState(null);

    useEffect(() => {
        getReviewDetail(id).then((data) => {
            console.log('리뷰 데이터:', data); // 디버깅용
            setReview(data);
        });
    }, [id]);

    if (!review) return <div className="loading">Loading...</div>;

    return (
        <div className="review-detail-wrapper">
            <div className="top-bar">
                <button className="back-btn" onClick={() => navigate('/review')}>
                    <img src="images/back.png" alt="Back" className="back-icon" />
                </button>
            </div>

            <div className="review-detail-container">
                <div className="review-detail-header">
                    <h2 className="review-title">{review.title}</h2>
                    <div className="review-meta">
                        <span className="review-gen">{review.generation}</span>
                        <span className="review-nationality">{review.nationality}</span>
                    </div>
                </div>

                <div className="review-author-info">
                    <span className="review-nickname">{review.nickname}</span>
                    <span className="review-date">{formatDate(review.createdTime)}</span>
                </div>

                <div className="review-content">{review.content}</div>
            </div>
        </div>

    );
};

const formatDate = (isoString) => {
    if (!isoString) return '작성일 없음';
    const date = new Date(isoString);
    if (isNaN(date)) return '유효하지 않은 날짜';
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};


export default ReviewDetail;
