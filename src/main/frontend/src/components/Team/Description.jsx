import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Description.css';

const R2_BASE_URL = 'https://pub-ee85493dc18e4a65aa97ee5157757291.r2.dev';

function Description() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const res = await axios.get('/api/teams');
                setTeams(res.data);
            } catch (err) {
                console.error('팀 정보 불러오기 실패:', err);
            }
        };

        fetchTeams();
    }, []);

    return (
        <div className="team-wrapper">
            {teams.map((team, index) => (
                <div
                    key={team.id}
                    className={`team-card ${index % 2 === 1 ? 'reverse' : ''}`}
                >
                    <h3 className="team-title">{team.name}</h3>
                    <div className="team-content">
                        <img
                            src={`${R2_BASE_URL}/${encodeURIComponent(team.name)}.${team.fileExt?.toLowerCase().match(/(jpg|png)$/) ? team.fileExt : 'jpg'}`}
                            alt={team.name}
                            className="team-image"
                            onContextMenu={(e) => e.preventDefault()}
                        />
                        <p className="team-description">
                            {team.description.split('\n').map((line, idx) => (
                                <span key={idx}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Description;
