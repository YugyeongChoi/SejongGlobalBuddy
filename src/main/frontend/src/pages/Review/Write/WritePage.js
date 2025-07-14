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
            const response = await postReview({ review, images });

            if (response.status === 200 && response.data === "saved") {
                navigate('/review', { state: { refresh: true } });
            }

        } catch (error) {
            console.error("Failed to submit review:", error);
            const message = error?.response?.data || "An error occurred while submitting the review.";
            alert(message);
        }
    };

    return (
        <div className="review-write-container">
            <div className="button-row">

                <button
                    className="back-btn"
                    onClick={() => {
                        const shouldLeave = window.confirm('Are you sure you want to leave? Your progress will not be saved.');
                        if (shouldLeave) {
                            navigate('/review');
                        }
                    }}
                >
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
