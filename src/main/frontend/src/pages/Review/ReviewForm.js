import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
    const [form, setForm] = useState({
        title: '',
        content: '',
        password: '',
        nationality: 'Korean',
        generation: '',
        nickname: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'nickname' && value.length > 10) return;
        setForm({ ...form, [name]: value });
    };

    const handleSelect = (key, value) => {
        setForm({ ...form, [key]: value });
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

            {/* Nationality 선택 */}
            <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
                {['Korean', 'International'].map((type) => (
                    <button
                        type="button"
                        key={type}
                        onClick={() => handleSelect('nationality', type)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            border: 'none',
                            backgroundColor: form.nationality === type ? '#777' : '#ddd',
                            color: form.nationality === type ? '#fff' : '#555'
                        }}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Generation 선택 (Korean일 때만) */}
            {form.nationality === 'Korean' && (
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    {['23th', '24th', 'OB'].map((gen) => (
                        <button
                            type="button"
                            key={gen}
                            onClick={() => handleSelect('generation', gen)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '20px',
                                border: 'none',
                                backgroundColor: form.generation === gen ? '#777' : '#ddd',
                                color: form.generation === gen ? '#fff' : '#555'
                            }}
                        >
                            {gen}
                        </button>
                    ))}
                </div>
            )}

            {/* Nickname */}
            <div>
                <label style={{ fontWeight: '500', color: '#888' }}>Nickname</label><br />
                <input
                    name="nickname"
                    placeholder="Maximum 10 characters"
                    value={form.nickname}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: '20px', padding: '6px 14px', border: '1px solid #ccc' }}
                />
            </div>

            <button type="submit">작성</button>
        </form>
    );
};

export default ReviewForm;
