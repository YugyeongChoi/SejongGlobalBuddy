import React, { useEffect, useCallback } from 'react';
import BuddyPlus from '../../components/Rank/BuddyPlus';
import BuddyCross from '../../components/Rank/BuddyCross';
import './RankPage.css';

const TROPHY_IMG = '/images/trophy.png';

const palettes = {
    gold: ['#f59e0b', '#fbbf24', '#fde68a', '#fff7cc'],
    pastel: ['#a5b4fc', '#93c5fd', '#c7d2fe', '#fecaca', '#fde68a'],
};

const RankPage = () => {
    const fireConfetti = useCallback(async (palette = 'gold', shape = 'square') => {
        const { default: confetti } = await import('canvas-confetti');

        const shoot = confetti.create(undefined, { resize: true, useWorker: true, zIndex: 9999 });

        const colors = palettes[palette] || palettes.gold;

        shoot({
            particleCount: 120,
            spread: 70,
            startVelocity: 40,
            gravity: 0.9,
            scalar: 1.0,
            drift: 0,
            ticks: 200,
            origin: { y: 0.4 },
            colors,
            shapes: [shape],
        });

        shoot({ particleCount: 60, angle: 60,  spread: 55, origin: { x: 0, y: 0.5 }, colors, shapes: [shape], gravity: 0.9 });
        shoot({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1, y: 0.5 }, colors, shapes: [shape], gravity: 0.9 });
    }, []);

    useEffect(() => { fireConfetti('gold', 'square'); }, [fireConfetti]);

    return (
        <div className="rank-page">
            <img
                className="rank-trophy"
                src={TROPHY_IMG}
                alt="trophy"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                onClick={() => fireConfetti('pastel', 'square')}
                draggable={false}
            />
            <BuddyPlus />
            <BuddyCross />
        </div>
    );
};

export default RankPage;
