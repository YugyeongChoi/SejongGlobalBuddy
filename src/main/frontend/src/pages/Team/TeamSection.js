import React from 'react';
import './TeamSection.css';

const team = [
    {
        id: 1,
        title: '기획팀',
        image: '/images/planning.JPG',
        description: '기획팀 소개',
    },
    {
        id: 2,
        title: '영상팀',
        image: '/images/video.JPG',
        description: '영상팀 소개',
    },
    {
        id: 3,
        title: '홍보팀',
        image: '/images/promotion.JPG',
        description: '홍보팀 소개',
    },
    {
        id: 4,
        title: '행정팀',
        image: '/images/administration.JPG',
        description: '행정팀 소개',
    },
];

function TeamSection() {
    return (
        <div className="team-wrapper">
            {team.map((item, index) => (
                <div
                    key={item.id}
                    className={`team-card ${index % 2 === 1 ? 'reverse' : ''}`}
                >
                    <h3 className="team-title">{item.title}</h3>
                    <div className="team-content">
                        <img src={item.image} alt={item.title} className="team-image" />
                        <p className="team-description">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}



export default TeamSection;
