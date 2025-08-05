package sejong.globalbuddy.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import sejong.globalbuddy.dto.BuddyCrossDto;
import sejong.globalbuddy.entity.BuddyCrossEntity;
import sejong.globalbuddy.service.BuddyCrossService;

import java.util.List;

@RestController
@RequestMapping("/api/buddycross")
@RequiredArgsConstructor
@CrossOrigin
public class BuddyCrossController {

    private final BuddyCrossService buddyCrossService;

    @PostMapping
    public void create(@RequestBody BuddyCrossDto dto) {
        buddyCrossService.save(dto);
    }

    @GetMapping
    public List<BuddyCrossEntity> getRanking() {
        return buddyCrossService.getAllRanking();
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody BuddyCrossDto dto) {
        buddyCrossService.update(id, dto.getScore());
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        buddyCrossService.delete(id);
    }

}
