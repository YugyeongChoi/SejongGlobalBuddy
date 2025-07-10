import React, {useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import {useNavigate} from 'react-router-dom';
import './Form.css';

const Form = forwardRef(({onSubmit, initialData}, ref) => {
    const [form, setForm] = useState({
        title: '',
        content: '',
        password: '',
        nationality: 'Korean',
        generation: '',
        nickname: '',
    });

    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
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
        const {name, value} = e.target;
        if (name === 'nickname' && value.length > 10) return;
        setForm({...form, [name]: value});
    };

    const handleSelect = (key, value) => {
        setForm({...form, [key]: value});
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const totalSize = files.reduce((acc, file) => acc + file.size, 0);

        if (totalSize > 30 * 1024 * 1024) {
            alert('파일 용량이 너무 큽니다! 총 30MB 이하로 올려주세요.');
            return;
        }

        const previews = files.map(file => URL.createObjectURL(file));
        setImages(files);
        setPreviewUrls(previews);
    };

    const handleRemoveImage = (indexToRemove) => {
        const newImages = images.filter((_, index) => index !== indexToRemove);
        const newPreviews = previewUrls.filter((_, index) => index !== indexToRemove);
        setImages(newImages);
        setPreviewUrls(newPreviews);
    };


    useImperativeHandle(ref, () => ({
        submit: () => {
            if (!showExtraFields) {
                setShowExtraFields(true);
                return;
            }

            onSubmit({...form, images});
            navigate('/review');
        }
    }));

    return (
        <div className="review-form-container">

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
                    onChange={(e) => {
                        if (e.target.value.length <= 1000) {  // 예: 1000자 제한
                            handleChange(e);
                        }
                    }}
                    required
                    className="content-textarea"
                />
                <div className="text-length-info">
                    {form.content.length} / 1000
                </div>

                <div className="image-preview-container">
                    {previewUrls.map((url, index) => (
                        <div className="image-box" key={index}>
                            <img
                                src={url}
                                alt={`preview-${index}`}
                                className="image-preview"
                            />
                            <button
                                type="button"
                                className="remove-btn"
                                onClick={() => handleRemoveImage(index)}
                            >
                                x
                            </button>
                        </div>
                    ))}
                </div>

                <div className="custom-divider" />

                <div className="custom-upload-wrapper">
                    <input
                        type="file"
                        id="image-upload"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />

                    <label htmlFor="image-upload" className="custom-upload-box">
                        <img src="/images/photo.png" alt="Photo upload icon" className="upload-icon" />
                        <span className="upload-text">Photo</span>
                    </label>
                </div>

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

                        <button
                            type="button"
                            className="submit-btn"
                            onClick={() => ref.current?.submit()}
                        >
                            Post now
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
});

export default Form;
