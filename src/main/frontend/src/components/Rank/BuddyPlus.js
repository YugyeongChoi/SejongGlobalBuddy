import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import './BuddyPlus.css';

const DEFAULT_IMG = '/images/team.png';
const R2_BASE_URL = 'https://pub-ee85493dc18e4a65aa97ee5157757291.r2.dev';

function TeamImage({ team, alt, className, emphasize }) {
    const candidates = useMemo(
        () => ['.jpg', '.JPG', '.png'].map(ext => `${R2_BASE_URL}/${encodeURIComponent(team)}${ext}`),
        [team]
    );
    const [idx, setIdx] = useState(0);

    useEffect(() => { setIdx(0); }, [team]);

    const handleError = (e) => {
        if (idx < candidates.length - 1) {
            setIdx(idx + 1);
        } else {
            e.currentTarget.onerror = null;
            e.currentTarget.src = DEFAULT_IMG;
        }
    };

    return (
        <div className={`pc-media ${emphasize ? 'large' : ''}`}>
            <img
                src={candidates[idx]}
                alt={alt}
                loading="lazy"
                onError={handleError}
            />
        </div>
    );
}

function Card({ index, team, koName, enName, bingo, emphasize = false }) {
    const rank = index + 1;
    return (
        <article className={`podium-card ${emphasize ? 'is-first' : ''}`}>
            <header className="pc-head">
                <span className="pc-rank">{rank}</span>
                <div className="pc-title">
                    <h3 className="pc-name">Team {team}</h3>
                    <p className="pc-members-ko">{koName}</p>
                    <p className="pc-members-en">{enName}</p>
                </div>
                <div className="pc-score">
                    <strong>{bingo}</strong>
                    <span>BINGO!</span>
                </div>
            </header>

            <TeamImage
                team={team}
                alt={`팀 ${team} 사진`}
                className="pc-image"
                emphasize={emphasize}
            />
        </article>
    );
}

const BuddyPlus = () => {
    const [top3, setTop3] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

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
                        team: it.team,
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

    const displayOrder = top3.length === 3 ? [1, 0, 2] : top3.map((_, i) => i);

    return (
        <div className="top3-wrap">
            <h2 className="bp-title">BuddyPlus</h2>

            {loading && <div className="bp-empty">불러오는 중…</div>}
            {err && <div className="bp-error">⚠️ {err}</div>}

            {!loading && !err && top3.length > 0 && (
                <div className="top3-grid">
                    {displayOrder.map((idx) => {
                        const item = top3[idx];
                        return (
                            <Card
                                key={item.id ?? `${item.team}-${idx}`}
                                index={idx}
                                team={item.team}
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
