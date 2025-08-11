import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import '../Manage.css';
import './RankManager.css';

const R2_BASE_URL = 'https://pub-ee85493dc18e4a65aa97ee5157757291.r2.dev';
const DEFAULT_IMG = '/images/team.png';

function TeamImage({ team, alt, className }) {
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
        <img
            src={candidates[idx]}
            alt={alt}
            className={className}
            loading="lazy"
            onError={handleError}
        />
    );
}

function BuddyPlusManager() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ team: '', koName: '', enName: '', bingo: '' });
    const [selectedFile, setSelectedFile] = useState(null);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchItems(); }, []);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/buddyplus');
            const list = Array.isArray(res.data) ? res.data : [];
            const normalized = list
                .map(it => ({
                    id: it.id,
                    team: Number(it.team),
                    koName: it.koName ?? it.ko_name ?? '',
                    enName: it.enName ?? it.en_name ?? '',
                    bingo: Number(it.bingo),
                }))
                .sort((a, b) => b.bingo - a.bingo || a.team - b.team);
            setItems(normalized);
        } catch (e) {
            console.error('BuddyPlus 목록 불러오기 실패:', e);
            alert('목록을 불러오지 못했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setForm({ team: '', koName: '', enName: '', bingo: '' });
        setSelectedFile(null);
        setEditId(null);
    };

    const validate = () => {
        if (!form.team || isNaN(form.team)) return '팀 번호를 숫자로 입력하세요.';
        if (!form.koName.trim()) return '한국어 이름을 입력하세요.';
        if (!form.enName.trim()) return '영어 이름을 입력하세요.';
        if (form.bingo === '' || isNaN(form.bingo)) return '빙고 점수를 숫자로 입력하세요.';
        return null;
    };

    const handleSubmit = async () => {
        const msg = validate();
        if (msg) { alert(msg); return; }

        try {
            const payload = {
                team: Number(form.team),
                koName: form.koName.trim(),
                enName: form.enName.trim(),
                bingo: Number(form.bingo),
            };

            if (editId) {
                await axios.put(`/api/buddyplus/${editId}`, payload);
            } else {
                await axios.post('/api/buddyplus', payload);
            }

            if (selectedFile) {
                const rawExt = (selectedFile.name.split('.').pop() || '').trim();
                const safeExt = /^(jpg|JPG|png)$/.test(rawExt) ? rawExt : 'jpg';

                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('filename', `${payload.team}.${safeExt}`);
                await axios.post('/api/files/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }

            alert(editId ? '수정 성공!' : '등록 성공!');
            resetForm();
            fetchItems();
        } catch (e) {
            console.error('저장 실패:', e);
            alert('저장 중 오류가 발생했습니다.');
        }
    };

    const handleEdit = (row) => {
        setForm({
            team: row.team,
            koName: row.koName,
            enName: row.enName,
            bingo: row.bingo,
        });
        setEditId(row.id);
        setSelectedFile(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        try {
            await axios.delete(`/api/buddyplus/${id}`);
            fetchItems();
        } catch (e) {
            console.error('삭제 실패:', e);
            alert('삭제 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="bp-manager">
            <h2>BuddyPlus 관리</h2>

            <h3>{editId ? '✏️ 수정' : '➕ 새 항목 입력'}</h3>
            <div className="bp-form">
                <input
                    type="number"
                    placeholder="팀 번호 (예: 4)"
                    value={form.team}
                    onChange={(e) => setForm({ ...form, team: e.target.value })}
                    disabled={editId !== null}
                    min={0}
                />
                <input
                    type="text"
                    placeholder="한국어 이름 (쉼표로 구분)"
                    value={form.koName}
                    onChange={(e) => setForm({ ...form, koName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="영어 이름 (쉼표로 구분)"
                    value={form.enName}
                    onChange={(e) => setForm({ ...form, enName: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="빙고 (예: 5)"
                    value={form.bingo}
                    onChange={(e) => setForm({ ...form, bingo: e.target.value })}
                    min={0}
                />

                <div className="upload-actions">
                    <div className="custom-file-upload">
                        <label htmlFor="buddyplus-image-upload">📎 이미지 선택</label>
                        <input
                            id="buddyplus-image-upload"
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
                        <button className="action-btn cancel-btn" onClick={resetForm}>
                            취소
                        </button>
                    )}
                </div>
            </div>

            <h3>📋 목록 (bingo 높은 순)</h3>
            {loading ? (
                <div className="bp-empty">불러오는 중…</div>
            ) : (
                <ul className="bp-list">
                    {items.map((row, idx) => (
                        <li key={row.id} className="bp-item">
                            <div className="bp-item-main">
                                <strong className="bp-item-title">
                                    #{idx + 1} — Team {row.team}
                                </strong>
                                <p className="bp-item-names">
                                    <span className="bp-ko">{row.koName}</span>
                                    <span className="bp-en">{row.enName}</span>
                                </p>
                                <p className="bp-item-score">
                                    BINGO: <strong>{row.bingo}</strong>
                                </p>
                            </div>

                            <div className="bp-item-side">
                                <TeamImage
                                    team={row.team}
                                    alt={`Team ${row.team}`}
                                    className="thumbnail"
                                />
                                <div className="bp-actions">
                                    <button className="edit-btn" onClick={() => handleEdit(row)}>수정</button>
                                    <button className="delete-btn" onClick={() => handleDelete(row.id)}>삭제</button>
                                </div>
                            </div>
                        </li>
                    ))}
                    {items.length === 0 && <div className="bp-empty">데이터가 없어요.</div>}
                </ul>
            )}
        </div>
    );
}

export default BuddyPlusManager;
