import React, { useEffect, useState } from 'react';
import { fetchReviews, deleteReview } from '../../../api/reviewApi';
import './ReviewManager.css';

const ReviewManager = () => {
    const [reviews, setReviews] = useState([]);

    const loadReviews = async () => {
        try {
            const data = await fetchReviews();
            setReviews(data);
        } catch (err) {
            console.error('리뷰 로딩 실패:', err);
        }
    };

    useEffect(() => {
        loadReviews();
    }, []);

    const handleDelete = async (reviewId) => {
        const input = window.prompt(
            `리뷰를 삭제하면 되돌릴 수 없습니다.\n리뷰 ID ${reviewId}를 삭제하려면 delete 라고 입력해주세요.`
        );

        if (input !== 'delete') {
            alert('삭제가 취소되었습니다.');
            return;
        }

        try {
            await deleteReview(reviewId);
            alert('리뷰가 삭제되었습니다.');
            loadReviews();
        } catch (err) {
            console.error(err);
            alert('삭제 실패');
        }
    };

    return (
        <div className="review-manager">
            <h2>📋 리뷰 관리</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>날짜</th>
                    <th>좋아요</th>
                    <th>삭제</th>
                </tr>
                </thead>
                <tbody>
                {reviews.map((r) => (
                    <tr key={r.id}>
                        <td>{r.id}</td>
                        <td>{r.title}</td>
                        <td>{r.nickname}</td>
                        <td>{new Date(r.createdTime).toLocaleDateString()}</td>
                        <td>{r.likes}</td>
                        <td>
                            <button onClick={() => handleDelete(r.id)}>삭제</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReviewManager;
