import React, {useState} from 'react';
import './ManagePage.css';
import BuddyCrossManager from "../../components/Manage/Rank/BuddyCrossManager";
import DataManager from "../../components/Manage/Data/DataManager";
import CalendarManager from "../../components/Manage/Main/CalendarManager";
import ReviewManager from "../../components/Manage/Review/ReviewManager";
import FaqManager from "../../components/Manage/Faq/FaqManager";
import TeamManager from "../../components/Manage/Team/TeamManager";
import BuddyPlusManager from "../../components/Manage/Rank/BuddyPlusManager";

const ManagePage = () => {
    const [currentTab, setCurrentTab] = useState('main');

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
                    {currentTab === 'main' && <CalendarManager/>}
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
