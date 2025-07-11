import React from 'react';
import {useNavigate} from 'react-router-dom';
import Form from '../../../components/Review/Write/Form';
import {postReview} from '../../../api/reviewApi';
import './WritePage.css';

const WritePage = () => {
    const navigate = useNavigate();
    const formRef = React.useRef();

    const handleSubmit = async (formValues) => {
        console.log("handleSubmit formValues =", formValues);

        const {
            title,
            content,
            password,
            nationality,
            generation,
            nickname,
            images
        } = formValues;

        const review = {
            title, content, password, nationality, generation, nickname
        };

        try {
            await postReview({ review, images });
            navigate('/review');
        } catch (error) {
            console.error("리뷰 작성 실패:", error);
            alert("리뷰 작성 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="review-write-container">
            <div className="button-row">

                <button className="back-btn" onClick={() => navigate('/review')}>
                    <img src="images/back.png" alt="Back" className="back-icon"/>
                </button>
                <button className="post-btn" onClick={() => formRef.current?.submit()}>Post</button>
            </div>

            <Form
                onSubmit={handleSubmit}
                ref={formRef}
                showExtraFields={false}
            />
        </div>
    );
};

export default WritePage;
