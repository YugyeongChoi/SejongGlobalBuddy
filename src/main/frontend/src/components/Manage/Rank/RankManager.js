import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './RankManager.css';

const RankManager = () => {
    const [name, setName] = useState('');
    const [generation, setGeneration] = useState('');
    const [score, setScore] = useState('');
    const [rankingList, setRankingList] = useState([]);
    const [editId, setEditId] = useState(null);

    const fetchRanking = async () => {
        try {
            const res = await axios.get('/api/buddycross');
            setRankingList(res.data);
        } catch (err) {
            console.error('랭킹 조회 실패:', err);
        }
    };

    useEffect(() => {
        fetchRanking();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const parsedScore = parseInt(score);

        if (parsedScore <= 0 || isNaN(parsedScore)) {
            alert('점수는 0 이상의 양수여야 합니다.');
            return;
        }

        try {
            if (editId) {
                await axios.put(`/api/buddycross/${editId}`, {
                    name,
                    generation,
                    score: parsedScore,
                });
                alert('수정 완료!');
            } else {
                await axios.post('/api/buddycross', {
                    name,
                    generation,
                    score: parsedScore,
                });
                alert('점수 입력 완료!');
            }

            setName('');
            setGeneration('');
            setScore('');
            setEditId(null);
            fetchRanking();
        } catch (err) {
            console.error('저장 실패:', err);
            alert('오류가 발생했습니다.');
        }
    };

    const handleEdit = (entry) => {
        setName(entry.name);
        setGeneration(entry.generation);
        setScore(entry.score);
        setEditId(entry.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                await axios.delete(`/api/buddycross/${id}`);
                fetchRanking();
            } catch (err) {
                console.error('삭제 실패:', err);
                alert('삭제 중 오류 발생');
            }
        }
    };

    return (
        <div className="ranking-container">
            <h2>BuddyCross</h2>
            <h3>{editId ? '✏️ 점수 수정하기' : '✏️ 점수 입력하기'}</h3>
            <form onSubmit={handleSubmit} className="input-form">
                <input
                    type="text"
                    placeholder="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="25기"
                    value={generation}
                    onChange={(e) => setGeneration(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="점수"
                    value={score}
                    min="1"
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || parseInt(value) > 0) {
                            setScore(value);
                        }
                    }}
                    required
                />
                <button type="submit">{editId ? '수정' : '제출'}</button>
            </form>

            <h3> 🗓️ 전체 리스트</h3>
            <table className="ranking-table">
                <thead>
                <tr>
                    <th>이름</th>
                    <th>기수</th>
                    <th>점수</th>
                    <th>수정</th>
                    <th>삭제</th>
                </tr>
                </thead>
                <tbody>
                {rankingList.map((entry) => (
                    <tr key={entry.id}>
                        <td>{entry.name}</td>
                        <td>{entry.generation}</td>
                        <td>{entry.score}</td>
                        <td>
                            <button className="edit-btn" onClick={() => handleEdit(entry)}>수정</button>
                        </td>
                        <td>
                            <button className="delete-btn" onClick={() => handleDelete(entry.id)}>삭제</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RankManager;
