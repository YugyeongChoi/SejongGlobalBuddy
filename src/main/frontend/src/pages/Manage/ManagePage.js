import React, {useState} from 'react';
import './ManagePage.css';
import BuddyCrossManager from "../../components/Manage/Rank/BuddyCrossManager";
import DataManager from "../../components/Manage/Data/DataManager";
import CalendarManager from "../../components/Manage/Main/CalendarManager";
import ReviewManager from "../../components/Manage/Review/ReviewManager";
import FaqManager from "../../components/Manage/Faq/FaqManager";
import TeamManager from "../../components/Manage/Team/TeamManager";
import BuddyPlusManager from "../../components/Manage/Rank/BuddyPlusManager";
import PreviewManager from "../../components/Manage/Main/PreviewManager";
import MainImageManager from "../../components/Manage/Main/MainImageManager";
import PasswordModal from "../../components/Password/PasswordModal";

const ManagePage = () => {
    const [currentTab, setCurrentTab] = useState('main');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handlePasswordSuccess = () => {
        setIsAuthenticated(true);
    };

    if (!isAuthenticated) {
        return <PasswordModal
            onSuccess={handlePasswordSuccess}
            titleKr="이 탭은 글로벌 버디 운영진만 접근 가능합니다."
            titleEn="This tab is only available for Global Buddy management team."
            correctPassword="admin25"
        />;
    }

    return (
        <div className="manage-container">
            <>
                <div className="tab-menu">
                    {['main', 'rank', 'data', 'review', 'team', 'faq'].map((tab) => (
                        <button
                            key={tab}
                            className={currentTab === tab ? 'active' : ''}
                            onClick={() => setCurrentTab(tab)}
                        >
                            {tab.toUpperCase()}
                        </button>
                    ))}
                </div>
                <div className="background-container">
                    {currentTab === 'main' &&
                        <div className="main-managers">
                            <div className="main-section">
                                <MainImageManager/>
                            </div>
                            <div className="main-section">
                                <PreviewManager/>
                            </div>
                            <div className="main-section">
                                <CalendarManager/>
                            </div>
                        </div>
                    }
                    {currentTab === 'rank' && (
                        <div className="rank-managers">
                            <div className="rank-section">
                                <BuddyPlusManager/>
                            </div>
                            <div className="rank-section">
                                <BuddyCrossManager/>
                            </div>
                        </div>
                    )}
                    {currentTab === 'data' && <DataManager/>}
                    {currentTab === 'review' && <ReviewManager/>}
                    {currentTab === 'team' && <TeamManager/>}
                    {currentTab === 'faq' && <FaqManager/>}
                </div>
            </>
        </div>
    );
};

export default ManagePage;
