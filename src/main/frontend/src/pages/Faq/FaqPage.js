import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FaqPage.css';

function FaqPage() {
    const [language, setLanguage] = useState('ko');
    const [faqs, setFaqs] = useState([]);
    const [openStates, setOpenStates] = useState([]);

    const handleLangChange = (lang) => {
        setLanguage(lang);
    };

    const toggleFAQ = (index) => {
        setOpenStates((prev) =>
            prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
        );
    };

    useEffect(() => {
        fetch(`/api/faqs?lang=${language}`)
            .then((res) => res.json())
            .then((data) => {
                setFaqs(data);
                setOpenStates(new Array(data.length).fill(false));
            });
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
                <div className="faq-item" key={item.id}>
                    <div className="faq-question" onClick={() => toggleFAQ(index)}>
                        <strong>{item.question}</strong>
                        <span className="faq-icon">{openStates[index] ? '−' : '+'}</span>
                    </div>

                    <AnimatePresence initial={false}>
                        {openStates[index] && (
                            <motion.div
                                className="faq-answer"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                {item.answer}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}

export default FaqPage;
