import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BuddyPlus.css';

function Card({ index, koName, enName, bingo, emphasize = false }) {
    const rank = index + 1;

    return (
        <article className={`podium-card ${emphasize ? 'is-first' : ''} ${rank===2 ? 'rank-2' : ''} ${rank===3 ? 'rank-3' : ''}`}>
            <header className="pc-head">
                <span className="pc-rank">{rank}</span>
                <div className="pc-title">
                    <h3 className="pc-name">TOP {rank}</h3>
                    <p className="pc-members-ko">{koName}</p>
                    <p className="pc-members-en">{enName}</p>
                </div>
                <div className="pc-score">
                    <strong>{bingo}</strong>
                    <span>POINTS!</span>
                </div>
            </header>
        </article>
    );
}

const BuddyPlus = () => {
    const [top3, setTop3] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1000);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        let cancel = false;

        (async () => {
            try {
                const res = await axios.get('/api/buddyplus/top3');
                if (cancel) return;

                const list = Array.isArray(res.data) ? res.data : [];

                const normalized = list
                    .map((it) => ({
                        id: it.id,
                        koName: it.koName ?? it.ko_name ?? '',
                        enName: it.enName ?? it.en_name ?? '',
                        bingo: Number(it.bingo ?? 0),
                    }))
                    .sort((a, b) => b.bingo - a.bingo)
                    .slice(0, 3);

                setTop3(normalized);
            } catch (e) {
                console.error('BuddyPlus 불러오기 실패:', e);
                setErr('랭킹을 불러오지 못했습니다.');
            } finally {
                setLoading(false);
            }
        })();

        return () => { cancel = true; };
    }, []);

    const displayOrder = isMobile
        ? top3.map((_, i) => i)
        : top3.length === 1
            ? [0]
            : [1, 0, 2].filter(i => i < top3.length);

    return (
        <div className="top3-wrap">
            {loading && <div className="bp-empty">불러오는 중…</div>}
            {err && <div className="bp-error">⚠️ {err}</div>}

            {!loading && !err && top3.length > 0 && (
                <div className={`top3-grid ${top3.length === 1 ? 'one-item' : ''}`}>
                    {displayOrder.map((idx) => {
                        const item = top3[idx];
                        return (
                            <Card
                                key={item.id ?? `rank-${idx}`}
                                index={idx}
                                koName={item.koName}
                                enName={item.enName}
                                bingo={item.bingo}
                                emphasize={idx === 0}
                            />
                        );
                    })}
                </div>
            )}

            {!loading && !err && top3.length === 0 && (
                <div className="bp-empty">데이터가 없어요. 먼저 등록해 주세요.</div>
            )}
        </div>
    );
};

export default BuddyPlus;