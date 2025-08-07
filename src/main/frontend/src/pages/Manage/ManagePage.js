import React, {useState} from 'react';
import './ManagePage.css';
import RankManager from "../../components/Manage/Rank/RankManager";
import DataManager from "../../components/Manage/Data/DataManager";
import CalendarManager from "../../components/Manage/Main/CalendarManager";

const ManagePage = () => {
    const [currentTab, setCurrentTab] = useState('rank');

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
                    {currentTab === 'rank' && <RankManager/>}
                    {currentTab === 'data' && <DataManager/>}
                </div>
            </>
        </div>
    );
};

export default ManagePage;
