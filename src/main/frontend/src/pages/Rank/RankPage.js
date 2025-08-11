import React from 'react';
import BuddyPlus from '../../components/Rank/BuddyPlus';
import BuddyCross from '../../components/Rank/BuddyCross';

const RankPage = () => {
    return (
        <div className="rank-page">
            <BuddyPlus />
            <BuddyCross />
        </div>
    );
};

export default RankPage;
