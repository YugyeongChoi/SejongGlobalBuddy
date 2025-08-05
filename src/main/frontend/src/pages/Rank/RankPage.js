import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RankPage.css';

const RankPage = () => {
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const res = await axios.get('/api/buddycross');
                console.log('받은 데이터:', res.data);
                setRanking(res.data);
            } catch (err) {
                console.error('랭킹 가져오기 실패:', err);
            }
        };
        fetchRanking();
    }, []);

    return (
        <div className="rank-page">
            <h2 className="rank-title">🏆 BuddyCross Ranking</h2>
            <ol className="rank-list">
                {ranking.map((entry, index) => (
                    <li key={entry.id} className="rank-item">
                        <span className="rank-badge">{index + 1}</span>
                        <div className="rank-content">
                            <div className="rank-name">{entry.name}</div>
                            <div className="rank-generation">{entry.generation}</div>
                        </div>
                        <div className="rank-score">{entry.score}점</div>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default RankPage;
