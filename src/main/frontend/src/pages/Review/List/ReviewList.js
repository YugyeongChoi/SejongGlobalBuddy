import React from 'react';
import './ReviewList.css';
import { Link } from 'react-router-dom';

const ReviewList = ({ reviews }) => {
    return (
        <div className="review-list-container">
            {reviews.map((review) => (
                <Link to={`/review/${review.id}`} className="review-card-link" key={review.id}>
                    <div className="review-card">
                        <div className="review-card-header">
                            <div className="title-section">
                                <h3>{review.title}</h3>
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
                </Link>
            ))}
        </div>
    );
};

export default ReviewList;
