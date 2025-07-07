import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
    const [form, setForm] = useState({ title: '', content: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" placeholder="제목" value={form.title} onChange={handleChange} required />
            <textarea name="content" placeholder="내용" value={form.content} onChange={handleChange} required />
            <input name="password" type="password" placeholder="비밀번호" value={form.password} onChange={handleChange} required />
            <button type="submit">작성</button>
        </form>
    );
};

export default ReviewForm;
