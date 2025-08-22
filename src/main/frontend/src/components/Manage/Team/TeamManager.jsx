import React, {useEffect, useMemo, useState} from 'react';
import axios from 'axios';
import './TeamManager.css';
import '../Manage.css';

const R2_BASE_URL = 'https://pub-ee85493dc18e4a65aa97ee5157757291.r2.dev';

function TeamImage({ name, className }) {
    const candidates = useMemo(
        () => ['.jpg', '.JPG', '.png'].map(ext => `${R2_BASE_URL}/${encodeURIComponent(name)}${ext}`),
        [name]
    );
    const [idx, setIdx] = useState(0);

    useEffect(() => { setIdx(0); }, [name]);

    const handleError = (e) => {
        if (idx < candidates.length - 1) {
            setIdx(idx + 1);
        } else {
            e.currentTarget.style.display = 'none';
        }
    };

    return (
        <img
            src={candidates[idx]}
            alt={name}
            className={className}
            onError={handleError}
            loading="lazy"
        />
    );
}

function TeamManager() {
    const [teams, setTeams] = useState([]);
    const [newTeam, setNewTeam] = useState({name: '', description: ''});
    const [selectedFile, setSelectedFile] = useState(null);
    const [editId, setEditId] = useState(null);
    const TEAM_ORDER = ['기획팀', '영상팀', '홍보팀', '행정팀'];

    useEffect(() => { fetchTeams(); }, []);

    const fetchTeams = async () => {
        try {
            const res = await axios.get('/api/teams');
            setTeams(res.data);
        } catch (err) {
            console.error('팀 목록 불러오기 실패:', err);
        }
    };

    const handleSubmit = async () => {
        try {
            if (editId) {
                await axios.put(`/api/teams/${editId}`, newTeam);
            } else {
                await axios.post('/api/teams', newTeam);
            }

            if (selectedFile) {
                const ext = (selectedFile.name.split('.').pop() || '').trim();
                const isOk = /^(jpg|JPG|png)$/.test(ext);
                if (!isOk) {
                    alert('이미지 확장자는 jpg / JPG / png 만 가능합니다.');
                    return;
                }

                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('filename', `${newTeam.name}.${ext}`);
                await axios.post('/api/files/upload', formData, {
                    headers: {'Content-Type': 'multipart/form-data'},
                });
            }

            alert(editId ? '수정 성공!' : '추가 성공!');
            setNewTeam({name: '', description: ''});
            setSelectedFile(null);
            setEditId(null);
            fetchTeams();
        } catch (err) {
            console.error('요청 실패:', err);
            alert('처리 중 오류 발생');
        }
    };

    const handleEdit = (team) => {
        setNewTeam({name: team.name, description: team.description});
        setEditId(team.id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        try {
            await axios.delete(`/api/teams/${id}`);
            fetchTeams();
        } catch (err) {
            console.error('삭제 실패:', err);
            alert('삭제 중 오류 발생');
        }
    };

    return (
        <div className="team-manager">
            <h2>팀 관리</h2>

            <h3>{editId ? '✏️ 팀 수정' : '➕ 새 팀 입력'}</h3>
            <input
                type="text"
                placeholder="팀 이름"
                value={newTeam.name}
                onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
                disabled={editId !== null}
            />
            <textarea
                placeholder="팀 설명"
                rows={4}
                value={newTeam.description}
                onChange={(e) => setNewTeam({...newTeam, description: e.target.value})}
            />

            <div className="notice-danger">
                <p>※ 이미지 파일 이름이 반드시 <strong>Team 이름</strong>이어야 합니다.</p>
                <p>예) 기획팀 → 기획팀.jpg 또는 기획팀.png</p>
                <p>※ 확장자는 <strong>jpg</strong> / <strong>JPG</strong> / <strong>png</strong> 형식만 허용됩니다.</p>
            </div>

            <div className="upload-actions">
                <div className="custom-file-upload">
                    <label htmlFor="team-image-upload">📎이미지 선택</label>
                    <input
                        id="team-image-upload"
                        type="file"
                        accept=".jpg,.JPG,.png"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                    <span>{selectedFile?.name}</span>
                </div>

                <button className="action-btn" onClick={handleSubmit}>
                    {editId ? '수정' : '완료'}
                </button>

                {editId && (
                    <button
                        className="action-btn cancel-btn"
                        onClick={() => {
                            setEditId(null);
                            setNewTeam({name: '', description: ''});
                            setSelectedFile(null);
                        }}
                    >
                        취소
                    </button>
                )}
            </div>

            <h3>📋 팀 목록</h3>
            <ul className="team-list">
                {teams
                    .slice()
                    .sort((a, b) => TEAM_ORDER.indexOf(a.name) - TEAM_ORDER.indexOf(b.name))
                    .map((team) => (
                        <li key={team.id}>
                            <div>
                                <strong>{team.name}</strong>
                                <p>{team.description}</p>
                            </div>

                            <div className="team-footer">
                                <TeamImage name={team.name} className="thumbnail" />
                                <div className="team-actions">
                                    <button className="edit-btn" onClick={() => handleEdit(team)}>수정</button>
                                    <button className="delete-btn" onClick={() => handleDelete(team.id)}>삭제</button>
                                </div>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default TeamManager;
