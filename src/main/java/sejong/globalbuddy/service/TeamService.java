package sejong.globalbuddy.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sejong.globalbuddy.entity.TeamEntity;
import sejong.globalbuddy.repository.TeamRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamRepository teamRepository;

    public List<TeamEntity> getAll() {
        return teamRepository.findAll();
    }

    public TeamEntity create(TeamEntity team) {
        return teamRepository.save(team);
    }

    public TeamEntity update(Long id, TeamEntity updated) {
        TeamEntity team = teamRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Team not found"));

        team.setName(updated.getName());
        team.setDescription(updated.getDescription());

        return teamRepository.save(team);
    }

    public void delete(Long id) {
        teamRepository.deleteById(id);
    }
}