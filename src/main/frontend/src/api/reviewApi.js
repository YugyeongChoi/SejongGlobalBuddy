import axios from 'axios';

const API_BASE = 'https://www.sejongglobalbuddy.kr/review';

export const fetchReviews = async () => {
    const res = await axios.get(API_BASE);
    return res.data;
};

export const postReview = async (data) => {
    const { review, images } = data || {};

    if (!review) {
        throw new Error("review 값이 정의되지 않았습니다.");
    }

    const formData = new FormData();

    const reviewBlob = new Blob([JSON.stringify(review)], {
        type: 'application/json'
    });

    formData.append('review', reviewBlob);

    if (images && images.length > 0) {
        images.forEach((img) => {
            formData.append('images', img);
        });
    }

    return await axios.post(`${API_BASE}/write`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};



export const getReviewDetail = async (id) => {
    const res = await axios.get(`${API_BASE}/${id}`);
    return res.data;
};

export const updateReview = (id, data) => {
    return axios.put(`${API_BASE}/${id}`, data);
};

export const deleteReview = async (id) => {
    return await axios.delete(`${API_BASE}/${id}`);
};