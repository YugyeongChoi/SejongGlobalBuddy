import React, { useState } from 'react';
import './Faq.css';
import faqData from './FaqData';

function Faq() {
    const [language, setLanguage] = useState('ko');
    const [openStates, setOpenStates] = useState([]);

    const faqs = faqData[language];

    const handleLangChange = (lang) => {
        setLanguage(lang);
        setOpenStates(new Array(faqData[lang].length).fill(false));
    };

    const toggleFAQ = (index) => {
        const newStates = [...openStates];
        newStates[index] = !newStates[index];
        setOpenStates(newStates);
    };

    React.useEffect(() => {
        setOpenStates(new Array(faqs.length).fill(false));
    }, [language]);

    return (
        <div className="faq-page">
            <div className="faq-header">
                <h1 className="faq-title">Frequently Asked Questions</h1>

                <div className="faq-lang-buttons">
                    <button
                        onClick={() => handleLangChange('ko')}
                        className={`submit-btn ${language === 'ko' ? 'active' : ''}`}
                    >
                        한국어
                    </button>
                    <button
                        onClick={() => handleLangChange('en')}
                        className={`submit-btn ${language === 'en' ? 'active' : ''}`}
                    >
                        English
                    </button>
                </div>
            </div>

            {faqs.map((item, index) => (
                <div className={`faq-item ${openStates[index] ? 'open' : ''}`} key={index}>
                    <div className="faq-question" onClick={() => toggleFAQ(index)}>
                        <strong>{item.question}</strong>
                        <span className="faq-icon">{openStates[index] ? '−' : '+'}</span>
                    </div>
                    {openStates[index] && <div className="faq-answer">{item.answer}</div>}
                </div>
            ))}
        </div>
    );
}

export default Faq;
