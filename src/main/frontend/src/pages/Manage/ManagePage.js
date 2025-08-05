import React, { useState } from 'react';
import './ManagePage.css';
import RankManager from "../../components/Manage/RankManager";

const ManagePage = () => {
    const [currentTab, setCurrentTab] = useState('rank');

    return (
        <div className="manage-container">
            <div className="tab-menu">
                {['rank', 'main', 'data', 'review', 'team', 'faq'].map((tab) => (
                    <button
                        key={tab}
                        className={currentTab === tab ? 'active' : ''}
                        onClick={() => setCurrentTab(tab)}
                    >
                        {tab.toUpperCase()}
                    </button>
                ))}
            </div>

            {currentTab === 'rank' && <RankManager />}
            {currentTab !== 'rank' && (
                <div style={{ marginTop: '30px' }}>
                    <p><strong>{currentTab.toUpperCase()}</strong> 탭은 개발 중에 있습니다.</p>
                </div>
            )}
        </div>
    );
};

export default ManagePage;
