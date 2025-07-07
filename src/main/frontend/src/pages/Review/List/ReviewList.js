import React from 'react';
import './ReviewList.css';

const ReviewList = ({ reviews }) => {
    return (
        <div className="review-list-container">
            {reviews.map((review) => (
                <div className="review-card" key={review.id}>
                    <div className="review-card-header">
                        <div className="title-section">
                            <h3>{review.title}</h3>
                            <span className="badge">{review.id}</span>
                        </div>
                        <div className="author-options">
                            <span className="author">
                                {review.nationality === 'Korean'
                                    ? `${review.generation} ${review.nickname}`
                                    : `International ${review.nickname}`}
                            </span>
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
