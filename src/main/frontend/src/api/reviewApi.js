import axios from 'axios';

const API_BASE = '/review';

export const fetchReviews = async () => {
    const res = await axios.get(API_BASE);
    return res.data;
};

export const postReview = async (data) => {
    return await axios.post(`${API_BASE}/write`, data);
};
