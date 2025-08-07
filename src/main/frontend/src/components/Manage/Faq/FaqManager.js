import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FaqManager.css';

function FaqManager() {
    const [language, setLanguage] = useState('ko');
    const [faqs, setFaqs] = useState([]);
    const [form, setForm] = useState({ question: '', answer: '' });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchFaqs();
        resetForm();
    }, [language]);

    const fetchFaqs = async () => {
        try {
            const res = await axios.get(`/api/faqs?lang=${language}`);
            setFaqs(res.data);
        } catch (err) {
            alert('FAQ 불러오기 실패');
        }
    };

    const resetForm = () => {
        setForm({ question: '', answer: '' });
        setEditId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.question.trim() || !form.answer.trim()) {
            alert('질문과 답변을 모두 입력해주세요.');
            return;
        }

        try {
            if (editId) {
                await axios.put(`/api/faqs/${editId}`, {
                    ...form,
                    language,
                });
                alert('FAQ 수정 완료!');
            } else {
                await axios.post('/api/faqs', {
                    ...form,
                    language,
                });
                alert('FAQ 등록 완료!');
            }
            fetchFaqs();
            resetForm();
        } catch (err) {
            alert('저장 중 오류가 발생했습니다.');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                await axios.delete(`/api/faqs/${id}`);
                fetchFaqs();
            } catch (err) {
                alert('삭제 중 오류 발생');
                console.error(err);
            }
        }
    };

    const handleEdit = (faq) => {
        setForm({ question: faq.question, answer: faq.answer });
        setEditId(faq.id);
    };

    return (
        <div className="faq-manager">
            <h2>FAQ 관리</h2>

            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="ko">한국어</option>
                <option value="en">English</option>
            </select>

            <h3>{editId ? '✏️ FAQ 수정' : '➕ FAQ 입력'}</h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    type="text"
                    placeholder="질문"
                    value={form.question}
                    onChange={(e) => setForm({ ...form, question: e.target.value })}
                    required
                />
                <textarea
                    placeholder="답변"
                    value={form.answer}
                    onChange={(e) => setForm({ ...form, answer: e.target.value })}
                    required
                    rows={4}
                />
                <button type="submit">{editId ? '수정' : '등록'}</button>
                {editId && (
                    <button type="button" onClick={resetForm} style={{ marginLeft: '10px' }}>
                        취소
                    </button>
                )}
            </form>

            <h3>📋 FAQ 목록</h3>
            {faqs.map((faq) => (
                <div key={faq.id}>
                    <strong>{faq.question}</strong>
                    <p>{faq.answer}</p>
                    <div className="faq-actions">
                        <button className="edit-btn" onClick={() => handleEdit(faq)}>수정</button>
                        <button className="delete-btn" onClick={() => handleDelete(faq.id)}>삭제</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FaqManager;
