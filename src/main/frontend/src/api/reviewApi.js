import axios from 'axios';

const API_BASE = '/review';

export const fetchReviews = async () => {
    const res = await axios.get(API_BASE);
    return res.data;
};

export const postReview = async (formData) => {
    return await axios.post(`${API_BASE}/write`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};


export const getReviewDetail = async (id) => {
    const res = await axios.get(`/review/${id}`)
    return res.data;
};
export const updateReview = (id, data) => {
    return axios.put(`${API_BASE}/${id}`, data);
};

export const deleteReview = async (id) => {
    return await axios.delete(`${API_BASE}/${id}`);
};