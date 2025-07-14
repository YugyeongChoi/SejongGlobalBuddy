import React, {useEffect, useState, useRef} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {getReviewDetail, updateReview} from '../../../api/reviewApi';
import Form from "../../../components/Review/Write/Form";
import '../Write/WritePage.css'

const EditPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const formRef = useRef();
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        getReviewDetail(id).then(setInitialData).catch(() => {
            alert("Failed to load the review information.");
            navigate(-1);
        });
    }, [id, navigate]);

    const handleSubmit = async (formData) => {
        try {
            const {title, content, password, nationality, generation, nickname, images} = formData;

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
            const message = error?.response?.data || "An error occurred while updating the review.";
            alert(message);
        }
    };


    if (!initialData) return <div>Loading...</div>;

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
