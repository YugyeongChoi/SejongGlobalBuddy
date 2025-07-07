import React from 'react';
import './ReviewList.css'; // 스타일 분리해서 관리

const ReviewList = ({ reviews }) => {
    return (
        <div className="review-list-container">
            {reviews.map((review) => (
                <div className="review-card" key={review.id}>
                    <div className="review-card-header">
                        <div className="title-section">
                            <h3>{review.title}</h3>
                        </div>
                        <div className="author-options">
                            <span className="author">24기 DINH DIEU LINH</span>
                            <span className="options">⋮</span>
                        </div>
                    </div>
                    <div className="review-content">
                        <p>{review.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReviewList;
