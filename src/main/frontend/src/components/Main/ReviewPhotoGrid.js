import React from 'react';
import '../../pages/Main/MainPage.css';
import {useNavigate} from 'react-router-dom';

const ReviewPhotoGrid = ({reviews}) => {
    const navigate = useNavigate();
    const sliced = reviews.slice(0, 4); // 딱 4개만!

    const imageBaseURL =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:8081'
            : 'https://www.sejongglobalbuddy.kr';

    return (
        <div>
            <div className="review-photo-grid-container">
                {sliced.map((review) => {
                    const imagePath = review.photoUrls?.[0];
                    if (!imagePath) return null;

                    const encoded = encodeURIComponent(imagePath.substring('/images/'.length));

                    return (
                        <div
                            key={review.id}
                            className="photo-grid-item"
                            onClick={() => navigate(`/review/${review.id}`)}
                        >
                            <img
                                src={`${imageBaseURL}/review/images/${encoded}`}
                                alt={`review-${review.id}`}
                                className="photo-grid-img"
                                onContextMenu={(e) => e.preventDefault()}
                            />
                        </div>
                    );
                })}

            </div>
            <div className="view-more" onClick={() => navigate('/review')}>
                View More
            </div>
        </div>
    );
};

export default ReviewPhotoGrid;
