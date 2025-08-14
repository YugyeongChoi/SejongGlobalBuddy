import React, { useEffect, useState } from 'react';
import '../../pages/Main/MainPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReviewPhotoGrid = ({reviews}) => {
    const navigate = useNavigate();
    const [previewIds, setPreviewIds] = useState([]);

    useEffect(() => {
        const fetchPreviewIds = async () => {
            try {
                const response = await axios.get('/api/previews');
                setPreviewIds(response.data);
            } catch (error) {
                console.error('Failed to fetch preview IDs:', error);
            }
        };

        fetchPreviewIds();
    }, []);

    const imageBaseURL =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:8081'
            : 'https://www.sejongglobalbuddy.kr';

    const selectedReviews = previewIds
        .map(id => reviews.find(review => review.id === id))
        .filter(Boolean);

    return (
        <div>
            <div className="review-photo-grid-container">
                {selectedReviews.map((review) => {
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
