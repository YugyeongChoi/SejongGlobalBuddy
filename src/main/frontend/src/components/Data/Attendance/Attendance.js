import React from 'react';
import './Attendance.css';

const Attendance = () => {
    return (
        <div className="container">
            <section className="section">
                <h2>상벌점 규정</h2>
                <div className="rule-box">
                    <div className="box merit">
                        <h3>상점</h3>
                        <p><span className="highlight">+1점:</span> 회장이 지정하는 상점 부여 활동 참여자</p>
                        <ul>
                            <li>예: 캠퍼스투어 참여자, 공식행사 진행 봉사자, 개근한 단원, 자율적인 소모임 개최자 등</li>
                        </ul>
                        <p><span className="highlight">+3점:</span> 부팀장</p>
                    </div>
                    <div className="box demerit">
                        <h3>벌점</h3>
                        <p><span className="highlight">-1점:</span> 공식회의 및 행사 무단 지각/조퇴 시</p>
                        <p><span className="highlight">-3점:</span> 무단결석 – 사유서/증빙서류 미제출</p>
                        <ul>
                            <li>사유서/증빙서류 모두 제출 시 벌점 X</li>
                            <li>사유서/증빙서류 중 <strong>1개라도 미제출</strong> 시 벌점 -3점</li>
                            <li>OT PPT에 명시된 인정사유 외에는 제출하더라도 <strong>미인정</strong></li>
                        </ul>
                    </div>
                </div>
                <div className="notice">
                    <p>*세종 상벌점 기준, 벌점 1점 당 4000원 차감 후 회비 환급</p>
                    <p>*벌점 7점 이상 시 회비 환급 불가, 글로벌버디 퇴출</p>
                </div>
            </section>


            <section className="section">
                <h2>출결</h2>
                <div className="attendance-box">
                    <p><span className="highlight red">공식 행사 or 공식 회의</span> 결석, 조퇴 시 사유서와 증빙 서류 제출</p>
                    <ul>
                        <li>사유서: 공지일 D-2</li>
                        <li>증빙서류: 당일 D+2</li>
                        <li><strong>* 증빙서류는 발급 날짜 필수 포함</strong></li>
                    </ul>
                    <div className="reason-box">
                        <div>
                            <strong>인정 사유</strong>
                            <ul>
                                <li>보충 수업, 학교 내 시험, 직계 가족 경조사, 병결, 인턴, 대회</li>
                            </ul>
                        </div>
                        <div>
                            <strong>비인정 사유</strong>
                            <ul>
                                <li>개인 사유(과제 및 시험 준비, 팀플, 알바, 대외활동, 미팅 일정, 자격증 시험)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Attendance;
