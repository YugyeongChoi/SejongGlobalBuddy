import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReviewDetail, updateReview } from '../../../api/reviewApi';
import Form from "../../../components/Review/Write/Form";
import '../Write/WritePage.css'

const EditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        getReviewDetail(id).then(setInitialData).catch(() => {
            alert('리뷰 정보를 불러오지 못했습니다.');
            navigate(-1);
        });
    }, [id, navigate]);

    const handleSubmit = async (formData) => {
        try {
            const { title, content, password, nationality, generation, nickname, images } = formData;

            await updateReview(id, {
                review: {
                    title,
                    content,
                    password,
                    nationality,
                    generation,
                    nickname,
                },
                images,
            });

            navigate(`/review/${id}`);
        } catch (error) {
            alert('수정 중 오류가 발생했습니다.');
            console.error(error);
        }
    };


    if (!initialData) return <div>Loading...</div>;

    return (
        <div className="review-write-container">
            <div className="top-bar">
                <button className="back-btn" onClick={() => navigate('/review')}>←</button>
                <button className="post-btn" onClick={() => formRef.current?.submit()}>Edit</button>
            </div>

            <Form
                onSubmit={handleSubmit}
                ref={formRef}
                initialData={initialData}
                showExtraFields={false}
            />

        </div>
    );
};

export default EditPage;
