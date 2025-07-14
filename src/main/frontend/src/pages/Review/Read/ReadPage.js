import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {getReviewDetail} from '../../../api/reviewApi';
import './ReadPage.css';
import { likeReview } from '../../../api/reviewApi';
import {formatDateKST} from "../../../utils/reportWebVitals";

const ReadPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [review, setReview] = useState(null);

    const [likes, setLikes] = useState(0);

    useEffect(() => {
        getReviewDetail(id).then((data) => {
            // console.log('리뷰 데이터:', data);
            setReview(data);
            setLikes(data.likes || 0);
        });
    }, [id]);

    const handleLike = async () => {
        const likedKey = `liked-review-${review.id}`;

        if (localStorage.getItem(likedKey)) {
            alert("이미 좋아요를 누르셨어요!");
            return;
        }

        setLikes(prev => prev + 1);
        localStorage.setItem(likedKey, "true");

        try {
            await likeReview(review.id);
        } catch (error) {
            console.error("좋아요 실패:", error);
        }
    };

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
                    <span className="review-date">{formatDateKST(review.createdTime)}</span>
                </div>

                <div className="review-content">{review.content}</div>

                {review.photoUrls && review.photoUrls.length > 0 && (
                    <div className="review-photo-wrapper">
                        {review.photoUrls.map((url, index) => {
                            const imageBaseURL =
                                process.env.NODE_ENV === 'development'
                                    ? 'http://localhost:8081'
                                    : 'https://www.sejongglobalbuddy.kr';

                            const encodedFilename = encodeURIComponent(url.substring('/images/'.length));

                            return (
                                <img
                                    key={index}
                                    src={`${imageBaseURL}/review/images/${encodedFilename}`}
                                    alt={`uploaded-${index}`}
                                    className="review-photo"
                                />
                            );
                        })}
                    </div>
                )}
                <div className="like-section">
                    <button className="like-button" onClick={handleLike}>
                        <img src="/images/likes.ico" alt="like" className="like-icon" />
                        <link rel="icon" href="%PUBLIC_URL%/images/likes.ico" />

                    </button>
                    <span className="like-count">{likes}</span>
                </div>

            </div>
        </div>

    );
};

export default ReadPage;
