package sejong.globalbuddy.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import sejong.globalbuddy.entity.TeamEntity;
import sejong.globalbuddy.service.TeamService;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
@RequiredArgsConstructor
public class TeamController {

    private final TeamService teamService;

    @GetMapping
    public List<TeamEntity> getTeams() {
        return teamService.getAll();
    }

    @PostMapping
    public TeamEntity create(@RequestBody TeamEntity team) {
        return teamService.create(team);
    }

    @PutMapping("/{id}")
    public TeamEntity update(@PathVariable Long id, @RequestBody TeamEntity team) {
        return teamService.update(id, team);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        teamService.delete(id);
    }
}
