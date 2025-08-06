import React from 'react';
import './Guideline.css';

const Guideline = () => {
    return (
        <div className="buddy-container">
            <h2>먼슬리버디 vs 버디플러스 vs 버디크로스</h2>

            <div className="buddy-table">
                <div className="buddy-row buddy-header">
                    <div className="buddy-cell"></div>
                    <div className="buddy-cell monthly">먼슬리버디</div>
                    <div className="buddy-cell plus">버디플러스</div>
                    <div className="buddy-cell cross">버디크로스</div>
                </div>

                <div className="buddy-row">
                    <div className="buddy-cell">배정 대상</div>
                    <div className="buddy-cell">자신에게 배정된 교환학생 (2~3명)</div>
                    <div className="buddy-cell">자신 포함 GB 한국인 부원 (3명) + 그에 배정된 교환학생 (6~9명)</div>
                    <div className="buddy-cell">자신의 버디플러스 조 & 담당 버디를 제외한 교환학생</div>
                </div>

                <div className="buddy-row">
                    <div className="buddy-cell">활동 조건</div>
                    <div className="buddy-cell">
                        글로벌버디 <span className="highlight">수료 조건</span><br />
                        한 달에 한 번씩 인증 필수<br />
                        <span className="highlight">자신의 버디 1명 이상 참여 필수</span>
                    </div>
                    <div className="buddy-cell">
                        빙고판 활동<br />
                        한 학기에 한 번 인증 필수<br />
                        <span className="highlight">만남에 GB팀원 2명 이상, 교환학생 1/2 이상 참여 필수</span><br />
                        활동비 지원
                    </div>
                    <div className="buddy-cell">
                        자신의 담당 버디가 포함되어 있어도 <span className="highlight">다른 버디들이 포함되어 있다면 인증</span><br />
                        상품 지급
                    </div>
                </div>

                <div className="buddy-row buddy-footer">
                    <div className="buddy-cell"></div>
                    <div className="buddy-cell" colSpan={3}>
                        <span className="highlight">인증 필수 활동</span> (먼슬리버디 3번, 버디플러스 1번) / <span>선택 활동</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Guideline;
