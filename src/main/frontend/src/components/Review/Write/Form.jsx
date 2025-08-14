import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import './Form.css';
import ExtraFieldModal from './ExtraFieldModal';

const Form = forwardRef(({ onSubmit, initialData, showExtraFields: initialShowExtraFields = false }, ref) => {
    const [form, setForm] = useState({
        title: '',
        content: '',
        password: '',
        nationality: 'Korean',
        generation: '23th',
        nickname: '',
    });

    const [images, setImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [showExtraFields, setShowExtraFields] = useState(initialShowExtraFields);

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

            if (initialData.photoUrls && initialData.photoUrls.length > 0) {
                const baseURL = process.env.NODE_ENV === 'development'
                    ? 'http://localhost:8081'
                    : 'https://www.sejongglobalbuddy.kr';
                const previews = initialData.photoUrls.map((url) =>
                    `${baseURL}/review/images/${encodeURIComponent(url.substring('/images/'.length))}`
                );
                setPreviewUrls(previews);

                setImages(initialData.photoUrls.map((url) => ({ existing: true, url })));
            }
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'nickname' && value.length > 10) return;

        if (name === "title" && value.length > 30) {
            alert("The title can be up to 30 characters long.");
            return;
        }

        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelect = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const totalSize = files.reduce((acc, file) => acc + file.size, 0);

        if (totalSize > 30 * 1024 * 1024) {
            alert('The file size is too large. Please upload within 30MB total.');
            return;
        }

        const previews = files.map((file) => URL.createObjectURL(file));
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
        submit: async () => {
            if (!showExtraFields) {
                setShowExtraFields(true);
                return;
            }

            if (images.length === 0) {
                alert('Please upload at least one photo!');
                return;
            }

            try {
                await onSubmit({ ...form, images });
            } catch (error) {
                console.error("Error submitting review:", error);
                alert("There was an error posting your review. Please try again.");
            }
        },
    }));

    return (
        <div className="review-form-container">
            <div className="input-block">
                <input
                    name="title"
                    placeholder="Please enter a title"
                    value={form.title}
                    onChange={handleChange}
                    className="title-input"
                />
            </div>

            <div className="input-block">
                <textarea
                    name="content"
                    placeholder="Write your content here..."
                    value={form.content}
                    onChange={(e) => {
                        if (e.target.value.length <= 5000) {
                            handleChange(e);
                        }
                    }}
                    required
                    className="content-textarea"
                />
                <div className="text-length-info">{form.content.length} / 5000</div>

                <div className="image-preview-container">
                    {previewUrls.map((url, index) => (
                        <div className="image-box" key={index}>
                            <img src={url} alt={`preview-${index}`} className="image-preview" />
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
                <ExtraFieldModal
                    form={form}
                    setForm={setForm}
                    onClose={() => setShowExtraFields(false)}
                    onSubmit={() => ref.current?.submit()}
                    handleSelect={handleSelect}
                />
            )}
        </div>
    );
});

export default Form;
