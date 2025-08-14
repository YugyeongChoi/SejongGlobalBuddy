import React, {useEffect, useState} from 'react';
import {fetchReviews} from "../../api/reviewApi";
import List from "../../components/Review/List/List";
import {Link, useLocation} from 'react-router-dom';
import {FiEdit3} from "react-icons/fi";
import './Write/WritePage.css';
import './ReviewPage.css';
import FilterDropdown from "../../components/Review/List/FilterDropdown";

const ReviewPage = () => {
    const [reviews, setReviews] = useState([]);
    const location = useLocation();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [filter, setFilter] = useState('All');

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const loadReviews = async () => {
        try {
            const data = await fetchReviews();
            setReviews(data);
        } catch (err) {
            console.error('Failed:', err);
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

    const filtered = filter === 'All'
        ? reviews
        : reviews.filter(r =>
            filter === 'International'
                ? r.nationality !== 'Korean'
                : r.generation === filter
        );

    const sorted = [...filtered].sort((a, b) => b.id - a.id);

    const start = (currentPage - 1) * itemsPerPage;
    const paged = sorted.slice(start, start + itemsPerPage);
    const totalPages = Math.ceil(sorted.length / itemsPerPage);

    return (
        <div className="review-page">
            <div className="review-header">

                <h1>Global Buddy Review</h1>

                <FilterDropdown selected={filter} setSelected={(val) => {
                    setFilter(val);
                    setCurrentPage(1);
                }}/>
            </div>

            <List reviews={paged}/>


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
                <FiEdit3 color="white" size={28}/>
            </Link>
        </div>
    );
};

export default ReviewPage;
