import './Form.css';

const ExtraFieldModal = ({
                             form,
                             setForm,
                             onClose,
                             onSubmit,
                             handleSelect,
                         }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'nickname' && value.length > 10) return;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="review-modal-overlay">
            <div className="review-modal">
                <button className="close-modal-btn" onClick={onClose}>✕</button>

                <div className="button-group">
                    {['Korean', 'International'].map((type) => (
                        <button
                            key={type}
                            type="button"
                            className={`select-btn ${form.nationality === type ? 'active' : ''}`}
                            onClick={() => handleSelect('nationality', type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                {form.nationality === 'Korean' && (
                    <div className="button-group">
                        {['23th', '24th', 'OB'].map((gen) => (
                            <button
                                key={gen}
                                type="button"
                                className={`select-btn ${form.generation === gen ? 'active' : ''}`}
                                onClick={() => handleSelect('generation', gen)}
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
                <div className="consent-wrapper">
                    <label className="consent-label">
                        <input
                            type="checkbox"
                            checked={form.agreed || false}
                            onChange={(e) => setForm(prev => ({ ...prev, agreed: e.target.checked }))}
                        />
                        <span className="custom-checkbox" />
                        <span className="consent-text">
                            다른 사람의 얼굴이 뚜렷하게 보이는 사진은 초상권 보호를 위해 삼가 부탁드립니다. 이에 동의합니다.<br /><br />
                            Please avoid uploading photos in which other people's faces are clearly visible to respect their portrait rights. I agree to this guideline.
                        </span>
                    </label>
                </div>

                <button
                    className="submit-btn"
                    onClick={onSubmit}
                    disabled={!form.agreed}
                    style={{
                        opacity: form.agreed ? 1 : 0.5,
                        cursor: form.agreed ? 'pointer' : 'not-allowed'
                    }}
                >
                    Post now
                </button>

            </div>
        </div>
    );
};

export default ExtraFieldModal;
