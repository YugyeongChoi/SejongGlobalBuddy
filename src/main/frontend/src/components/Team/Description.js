import React from 'react';
import './Description.css';

const team = [
    {
        id: 1,
        title: '기획팀',
        image: '/images/planning.JPG',
        description: '기획팀은 글로벌버디의 꽃인 행사를 기획하는 팀입니다.\n' +
            '교환학생들이 학교 생활을 더 즐겁고 다양하게 경험할 수 있도록 매주 모여 회의를 진행하고 행사를 준비합니다.\n' +
            '자주 보는 만큼 돈독한 기획팀은, 모두가 자연스럽게 어울리고 좋은 추억을 남길 수 있도록 늘 고민하며 함께 나아갑니다.\n',
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

function Description() {
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



export default Description;
