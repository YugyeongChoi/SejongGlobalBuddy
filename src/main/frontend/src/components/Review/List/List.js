import React, { useState } from 'react';
import './List.css';
import { useNavigate } from 'react-router-dom';
import Setting from './Setting';
import { deleteReview } from '../../../api/reviewApi';

const List = ({ reviews }) => {
    const navigate = useNavigate();
    const [popupOpenId, setPopupOpenId] = useState([]);

    const handlePasswordSubmit = (inputPassword, review) => {
        if (inputPassword === review.password) {
            const confirmEdit = window.confirm('수정하시겠습니까? (취소 시 삭제)');
            if (confirmEdit) {
                navigate(`/review/edit/${review.id}`);
            } else {
                deleteReview(review.id)
                    .then(() => {
                        alert('삭제되었습니다.');
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.error(err);
                        alert('삭제 실패');
                    });
            }
        } else {
            alert('비밀번호가 틀렸습니다.');
        }
        setPopupOpenId(null); // 팝업 닫기
    };

    const handleCardClick = (review) => {
        if (popupOpenId === review.id) return; // 팝업 열려있으면 이동 막기
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
                            <Setting
                                isOpen={popupOpenId === review.id}
                                setOpen={(isOpen) =>
                                    setPopupOpenId(isOpen ? review.id : null)
                                }
                                onPasswordSubmit={(inputPassword) =>
                                    handlePasswordSubmit(inputPassword, review)
                                }
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
                            ❤️ {review.likes}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default List;
