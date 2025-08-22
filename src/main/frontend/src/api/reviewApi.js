import axios from 'axios';

const API_BASE = '/api/review';

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
            if (img instanceof File) {
                formData.append('images', img);
            }
        });
    }

    return axios.post(`${API_BASE}/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};


export const deleteReview = async (id) => {
    return await axios.delete(`${API_BASE}/${id}`);
};

export const likeReview = async (id) => {
    const res = await axios.put(`${API_BASE}/${id}/like`);
    return res.data;
};
