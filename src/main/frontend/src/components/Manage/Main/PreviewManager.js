import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../Manage.css';
import './MainManager.css';

const PreviewManager = () => {
    const [previewList, setPreviewList] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [originalValue, setOriginalValue] = useState(null);

    const fetchPreviewIds = async () => {
        try {
            const response = await axios.get('/api/previews');
            const data = response.data.map((id, idx) => ({
                reviewId: id,
                position: idx
            }));
            setPreviewList(data);
        } catch (error) {
            console.error('Error loading previews', error);
        }
    };

    useEffect(() => {
        fetchPreviewIds();
    }, []);

    const handleChange = (index, value) => {
        const updated = [...previewList];
        updated[index].reviewId = parseInt(value) || '';
        setPreviewList(updated);
    };

    const handleEdit = (index) => {
        setOriginalValue(previewList[index].reviewId);
        setEditIndex(index);
    };

    const handleCancel = () => {
        if (editIndex !== null) {
            const updated = [...previewList];
            updated[editIndex].reviewId = originalValue;
            setPreviewList(updated);
            setEditIndex(null);
            setOriginalValue(null);
        }
    };

    const handleSave = async () => {
        const payload = previewList
            .filter(p => !isNaN(p.reviewId) && p.reviewId !== '')
            .map((p, idx) => ({
                reviewId: Number(p.reviewId),
                position: idx
            }));

        try {
            await axios.post('/api/previews', payload);
            alert('저장 완료!');
            setEditIndex(null);
            setOriginalValue(null);
            fetchPreviewIds();
        } catch (err) {
            console.error('저장 실패:', err);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>프리뷰 관리</h2>
            <img
                src="/images/preview.png"
                className="preview-image"
                onContextMenu={(e) => e.preventDefault()}
            />

            {previewList.map((preview, index) => (
                <div key={index} className="preview-item">
                    {editIndex === index ? (
                        <>
                            <input
                                type="number"
                                value={preview.reviewId}
                                onChange={(e) => handleChange(index, e.target.value)}
                                className="preview-input"
                            />
                            <button className="preview-cancel-btn action-btn" onClick={handleCancel}>
                                취소
                            </button>
                        </>
                    ) : (
                        <>
                            <span>{index + 1}. 리뷰 ID: {preview.reviewId}</span>
                            <button className="edit-btn" onClick={() => handleEdit(index)}>
                                수정
                            </button>
                        </>
                    )}
                </div>
            ))}


            <br />
            <button className="action-btn" onClick={handleSave}>전체 저장</button>
        </div>
    );
};

export default PreviewManager;
