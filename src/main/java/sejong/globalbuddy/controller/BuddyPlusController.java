package sejong.globalbuddy.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sejong.globalbuddy.entity.BuddyPlusEntity;
import sejong.globalbuddy.service.BuddyPlusService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/buddyplus")
public class BuddyPlusController {

    private final BuddyPlusService service;

    @PostMapping
    public ResponseEntity<BuddyPlusEntity> create(@RequestBody BuddyPlusEntity entity) {
        return ResponseEntity.ok(service.save(entity));
    }

    @GetMapping("/top3")
    public ResponseEntity<List<BuddyPlusEntity>> getTop3() {
        return ResponseEntity.ok(service.getTop3());
    }

    @GetMapping
    public ResponseEntity<List<BuddyPlusEntity>> getAll() {
        return ResponseEntity.ok(service.getAllOrderByBingo());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
