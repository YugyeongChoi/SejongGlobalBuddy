import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import './ReviewForm.css';

const ReviewForm = forwardRef(({ onSubmit, initialData }, ref) => {
    const [form, setForm] = useState({
        title: '',
        content: '',
        password: '',
        nationality: 'Korean',
        generation: '',
        nickname: '',
    });

    const [showExtraFields, setShowExtraFields] = useState(false);

    useEffect(() => {
        if (initialData) {
            setForm({
                title: initialData.title || '',
                content: initialData.content || '',
                password: initialData.password || '',
                nationality: initialData.nationality || 'Korean',
                generation: initialData.generation || '',
                nickname: initialData.nickname || '',
            });
            setShowExtraFields(true);
        }
    }, [initialData]);

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
        if (!showExtraFields) {
            setShowExtraFields(true);
            return;
        }
        onSubmit(form);
    };

    useImperativeHandle(ref, () => ({
        submit: () => {
            const fakeEvent = { preventDefault: () => {} };
            handleSubmit(fakeEvent);
        }
    }));

    return (
        <form onSubmit={handleSubmit} className="review-form-container">
            <div className="input-block">
                <input
                    name="title"
                    placeholder="Please enter a title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="title-input"
                />
            </div>

            <div className="input-block">
                <textarea
                    name="content"
                    placeholder="Write your content here..."
                    value={form.content}
                    onChange={handleChange}
                    required
                    className="content-textarea"
                />
            </div>

            {showExtraFields && (
                <div className="review-modal-overlay">
                    <div className="review-modal">
                        <button
                            className="close-modal-btn"
                            onClick={() => setShowExtraFields(false)}
                        >
                            ✕
                        </button>

                        <div className="button-group">
                            {['Korean', 'International'].map((type) => (
                                <button
                                    type="button"
                                    key={type}
                                    onClick={() => handleSelect('nationality', type)}
                                    className={`select-btn ${form.nationality === type ? 'active' : ''}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        {form.nationality === 'Korean' && (
                            <div className="button-group">
                                {['23th', '24th', 'OB'].map((gen) => (
                                    <button
                                        type="button"
                                        key={gen}
                                        onClick={() => handleSelect('generation', gen)}
                                        className={`select-btn ${form.generation === gen ? 'active' : ''}`}
                                    >
                                        {gen}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="input-row">
                            <label className="review-label">Nickname</label>
                            <input
                                name="nickname"
                                placeholder="Maximum 10 characters"
                                value={form.nickname}
                                onChange={handleChange}
                                required
                                className="input"
                            />
                        </div>

                        <div className="input-row">
                            <label className="review-label">Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Enter a 6-digit PIN"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="input"
                            />
                        </div>

                        <button type="submit" className="submit-btn">
                            Post now
                        </button>
                    </div>
                </div>
            )}
        </form>
    );
});

export default ReviewForm;
