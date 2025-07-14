import React, { useState } from 'react';
import './List.css';
import { useNavigate } from 'react-router-dom';
import ActionMenu from './ActionMenu';
import { deleteReview } from '../../../api/reviewApi';

const List = ({ reviews }) => {
    const navigate = useNavigate();
    const [popupOpenReview, setPopupOpenReview] = useState(null);

    const handlePasswordSubmit = async (inputPassword, actionType, review) => {
        try {
            const res = await fetch(`/review/${review.id}/verify-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: inputPassword }),
            });

            if (!res.ok) {
                alert('비밀번호가 틀렸습니다.');
                return;
            }

            if (actionType === 'edit') {
                const confirmEdit = window.confirm('수정하시겠습니까?');
                if (confirmEdit) {
                    navigate(`/review/edit/${review.id}`);
                }
            } else if (actionType === 'delete') {
                const confirmDelete = window.confirm('삭제하시겠습니까?');
                if (confirmDelete) {
                    await deleteReview(review.id);
                    alert('삭제되었습니다.');
                    window.location.reload();
                }
            }
        } catch (error) {
            console.error(error);
            alert('서버 오류');
        } finally {
            setPopupOpenReview(null);
        }
    };

    const handleReport = async (reviewId) => {
        const confirmed = window.confirm('이 포스트를 신고하겠습니까?');
        if (!confirmed) return;

        try {
            const res = await fetch(`/review/report`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId: reviewId }),
            });

            if (res.ok) {
                alert('게시글이 신고되었습니다!');
            } else {
                alert('신고 중 오류가 발생했습니다.');
            }
        } catch (err) {
            console.error(err);
            alert('서버 오류가 발생했습니다.');
        }
    };


    const handleCardClick = (review) => {
        if (popupOpenReview?.id === review.id) return;
        navigate(`/review/${review.id}`);
    };

    return (
        <div className="review-list-container">
            {reviews.map((review) => (
                <div
                    key={review.id}
                    className="review-card-link"
                    onClick={() => handleCardClick(review)}
                >
                    <div className="review-card">
                        <div className="author-options">
                                <span className="author">
                                    {review.nationality === 'Korean'
                                        ? `${review.generation} ${review.nickname}`
                                        : `International ${review.nickname}`}
                                </span>
                            <ActionMenu
                                isOpen={popupOpenReview?.id === review.id}
                                reviewId={review.id}
                                setOpen={(isOpen) => setPopupOpenReview(isOpen ? review : null)}
                                onSubmitPassword={(pw, actionType) =>
                                    handlePasswordSubmit(pw, actionType, popupOpenReview)
                                }
                                onReport={() => handleReport(review.id)}
                            />

                        </div>
                        {review.photoUrls && review.photoUrls.length > 0 && (
                            <div className="thumbnail-wrapper">
                                <img
                                    className="thumbnail-img"
                                    src={`${
                                        process.env.NODE_ENV === 'development'
                                            ? 'http://localhost:8081'
                                            : 'https://www.sejongglobalbuddy.kr'
                                    }/review/images/${encodeURIComponent(
                                        review.photoUrls[0].substring('/images/'.length)
                                    )}`}
                                    alt="thumbnail"
                                />
                                {review.photoUrls.length > 1 && (
                                    <div className="thumbnail-overlay">
                                        {review.photoUrls.length - 1}+
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="review-card-header">
                            <div className="title-section">
                                <h3>{review.title}</h3>
                            </div>
                        </div>

                        <div className="review-content">
                            <p>{review.content}</p>
                        </div>

                        <div className="thumbnail-likes">
                            <img src="/images/likes.ico" alt="like" className="like-icon" />
                            <span>{review.likes}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default List;
