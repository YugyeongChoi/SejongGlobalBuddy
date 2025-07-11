import React, { useEffect, useState } from 'react';
import { fetchReviews } from "../../api/reviewApi";
import List from "../../components/Review/List/List";
import { Link, useLocation } from 'react-router-dom';
import { FiEdit3 } from "react-icons/fi";
import './Write/WritePage.css';
import './ReviewPage.css';

const ReviewPage = () => {
    const [reviews, setReviews] = useState([]);
    const location = useLocation();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReviews = reviews.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(reviews.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const loadReviews = async () => {
        try {
            const data = await fetchReviews();
            setReviews(data);
        } catch (err) {
            console.error('리뷰 가져오기 실패:', err);
        }
    };

    useEffect(() => {
        loadReviews();
    }, []);

    useEffect(() => {
        if (location.state?.fromForm) {
            loadReviews();
        }
    }, [location.state]);

    return (
        <div className="review-page">
            <h1>Global Buddy Review</h1>
            <List reviews={currentReviews} />

            <div className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            <Link to="/review/write" className="fab-button">
                <FiEdit3 color="white" size={28} />
            </Link>
        </div>
    );
};

export default ReviewPage;
