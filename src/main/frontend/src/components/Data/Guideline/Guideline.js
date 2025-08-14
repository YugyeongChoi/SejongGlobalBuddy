import React from 'react';
import './Guideline.css';

const Guideline = () => {
    return (
        <div className="buddy-container">
            <h2 className="buddy-title">활동 소개</h2>

            <div className="buddy-grid">
                <div className="buddy-card monthly">
                    <h3>먼슬리버디</h3>
                    <h4>매달 한 번씩 버디와 교류하는 활동</h4>
                    <p><strong>대상</strong><br/>자신에게 배정된 교환학생 (2~3명)</p>
                    <p><strong>인증 기준</strong><br />
                        한 달에 한 번 <span className="highlight">활동 인증 필수</span><br />
                        <span className="highlight">자신의 버디 1명 이상</span>
                    </p>
                    <p className="sub-info">*글로벌버디 수료 조건에 포함
                    <br/>*버디플러스 만남에 자신의 버디가 있다면, 먼슬리버디도 인정 가능
                    </p>
                </div>

                <div className="buddy-card smallgroup">
                    <h3>소모임</h3>
                    <h4>교환학생들과 취미생활을 즐기는 활동</h4>
                    <p><strong>대상</strong><br/>교환학생 누구나 가능</p>
                    <p><strong>인증 기준</strong><br />
                        한국인 N명 -> <span className="highlight">외국인 N+1명 이상</span>
                        <span className="highlight"></span>
                    </p>
                    <p className="sub-info">
                        *소모임 순번이 아니더라도 번개 소모임 주최 가능<br/>
                        *한국인 소모임 공동 개최 금지<br/>
                        *소모임에 자신의 버디가 포함되어도 먼슬리버디 인증 불가능
                    </p>
                </div>

                <div className="buddy-card plus">
                    <h3>버디플러스</h3>
                    <h4>GB 단원과 그에 배정된 교환학생으로 그룹화하여 교류하는 활동
                    </h4>
                    <p><strong>대상</strong><br/> 자신 포함 GB 부원 3명 + 그에 배정된 교환학생 6~9명</p>
                    <p><strong>인증 기준</strong><br />
                        GB단원 2명 이상, 교환학생은 <span className="highlight">GB단원 수 + 1명 이상</span> 참여 필수
                    </p>
                    <p className="sub-info">
                        *빙고판 활동<br/>
                        *빙고판을 가장 먼저 채운 조에게는 일정 수준의 활동비 지원
                    </p>
                </div>

                <div className="buddy-card cross">
                    <h3>버디크로스</h3>
                    <h4>자신의 버디플러스 조와 담당 버디를 제외한 교환학생들과 교류하며 점수를 얻는 활동</h4>
                    <p><strong>대상</strong><br/>버디플러스 조 & 담당 버디를 제외한 교환학생</p>
                    <p><strong>인증 기준</strong><br />
                        <span className="highlight">담당 버디 포함 여부 무관</span><br />
                        동일 버디와의 만남은 5번까지 인정 가능
                    </p>
                    <p className="sub-info">*우수 활동 시 상품 지급</p>
                </div>
            </div>

            <div className="buddy-footer-info">
                <span className="highlight">인증 필수 활동: 먼슬리버디 3회, 버디플러스 1회, 소모임 1회</span><br />
                그 외 활동은 <span>선택 활동</span>으로 인정됩니다.
            </div>
        </div>
    );
};

export default Guideline;
