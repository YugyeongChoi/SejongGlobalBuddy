import React from 'react';
import './Description.css';

const team = [
    {
        id: 1,
        title: '기획팀',
        image: '/images/planning.JPG',
        description: '기획팀은 글로벌버디의 꽃인 행사를 기획하는 팀입니다.\n' +
            '외국에서 온 교환학생들이 학교생활을 더 즐겁고 다채롭게 경험할 수 있도록, 매주 모여 회의를 진행하고 행사를 준비합니다.\n' +
            '국적과 언어를 넘어 자연스럽게 어울리고 마음을 나눌 수 있는 만남의 장을 만들고자 늘 노력하겠습니다!\n',
    },
    {
        id: 2,
        title: '영상팀',
        image: '/images/video.JPG',
        description: '영상팀은 글로벌버디에서의 추억을 영상으로 기록하는 팀입니다.\n' +
            '글로벌버디만의 다양한 콘텐츠를 기획/제작하고 있으며, 저희가 제작한 영상은\n' +
            '세종 글로벌버디 공식 유튜브에서 확인 가능합니다.\n' +
            '부원들과 교환학생들이 학기가 끝난 뒤에도 글로벌버디 활동을 추억할 수 있도록 의미 있는 콘텐츠 많이 만들어 보겠습니다! \n',
    },
    {
        id: 3,
        title: '홍보팀',
        image: '/images/promotion.JPG',
        description: '홍보팀은 글로벌 버디의 정체성과 매력을 시각적으로 표현하는 팀입니다.\n' +
            '행사에 사용되는 현수막, 굿즈, 팜플렛의 디자인을 담당하며, \n' +
            '글로벌 버디의 공식 행사 소식과 외국인 학우들이 한국 생활에 적응하는 데 유용한 정보를 카드뉴스, 포스터, 인스타툰 등의 다양한 콘텐츠로 제작합니다.\n ' +
            '우리가 만든 하나의 작업물이 누군가에게는 글로벌 버디의 첫 인상이 될 수 있다는 마음으로 홍보물을 만들어 가겠습니다!\n',
    },
    {
        id: 4,
        title: '행정팀',
        image: '/images/administration.jpeg',
        description: '행정팀은 글로벌버디의 흐름을 책임지는 든든한 중심의 역할을 하는 팀입니다.\n' +
            '버디 매칭, 소모임 관리, 행사 당일 인원 배치와 타임테이블 조정까지, 모든 활동이 원활하게 진행될 수 있도록 체계적으로 준비합니다.\n' +
            '서로 다른 성향의 한국인과 외국인 버디들이 자연스럽게 어울릴 수 있도록 세부적인 요소까지 꼼꼼히 고려하며, 참여자 모두가 균형 있고 즐겁게 활동할 수 있도록 최선을 다하겠습니다!\n',
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
                        <img src={item.image}
                             alt={item.title}
                             className="team-image"
                             onContextMenu={(e) => e.preventDefault()}
                        />
                        <p className="team-description">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}



export default Description;
