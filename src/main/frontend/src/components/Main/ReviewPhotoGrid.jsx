import React, { useEffect, useState } from 'react';
import '../../pages/Main/MainPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReviewPhotoGrid = ({reviews}) => {
    const navigate = useNavigate();
    const [previewIds, setPreviewIds] = useState([]);

    const apiBaseURL =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:8081/api'
            : 'https://www.sejongglobalbuddy.kr/api';

    useEffect(() => {
        const fetchPreviewIds = async () => {
            try {
                const response = await axios.get(`${apiBaseURL}/previews`);
                setPreviewIds(response.data);
            } catch (error) {
                console.error('리뷰 불러오기 실패:', error);
            }
        };

        fetchPreviewIds();
    }, [apiBaseURL]);


    const imageBaseURL =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:8081/api'
            : 'https://www.sejongglobalbuddy.kr/api';

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
