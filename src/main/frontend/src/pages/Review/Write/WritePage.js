import React from 'react';
import { useNavigate } from 'react-router-dom';
import ModalForm from '../../../components/Review/Write/ModalForm';
import { postReview } from '../../../api/reviewApi';
import './WritePage.css';

const WritePage = () => {
    const navigate = useNavigate();
    const formRef = React.useRef();

    const handleSubmit = async (formData) => {
        try {
            await postReview(formData);
            navigate('/review');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data);
            } else {
                alert('오류가 발생했습니다.');
                console.error(error);
            }
        }
    };

    return (
        <div className="review-write-container">
            <div className="top-bar">
                <button className="back-btn" onClick={() => navigate('/review')}>
                    <img src="images/back.png" alt="Back" className="back-icon" />
                </button>
                <button className="post-btn" onClick={() => formRef.current?.submit()}>Post</button>
            </div>

            <ModalForm onSubmit={handleSubmit} ref={formRef} />
        </div>
    );
};

export default WritePage;
