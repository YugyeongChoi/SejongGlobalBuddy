import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BuddyCross.css';

const BuddyCross = () => {
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let cancel = false;
        (async () => {
            try {
                const res = await axios.get('/api/buddycross');
                if (!cancel) {
                    setRanking(Array.isArray(res.data) ? res.data : []);
                    setLoading(false);
                }
            } catch (error) {
                console.error('랭킹 가져오기 실패:', error);
                if (!cancel) {
                    setErr('랭킹 데이터를 불러오지 못했습니다.');
                    setLoading(false);
                }
            }
        })();
        return () => { cancel = true; };
    }, []);

    return (
        <div className="buddycross-rank">
            <h2 className="rank-title">BuddyCross</h2>

            {loading && <div className="rank-empty">불러오는 중…</div>}
            {err && <div className="rank-error">⚠️ {err}</div>}

            {!loading && !err && ranking.length > 0 && (
                <ol className="rank-list">
                    {ranking.map((entry, index) => (
                        <li key={entry.id ?? `${entry.name}-${index}`} className="rank-item">
                            <span className="rank-badge">{index + 1}</span>
                            <div className="rank-content">
                                <div className="rank-name">{entry.name}</div>
                                <div className="rank-generation">{entry.generation}</div>
                            </div>
                            <div className="rank-score">{entry.score}점</div>
                        </li>
                    ))}
                </ol>
            )}
        </div>
    );
};

export default BuddyCross;
