package sejong.globalbuddy.service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sejong.globalbuddy.dto.BuddyCrossDto;
import sejong.globalbuddy.entity.BuddyCrossEntity;
import sejong.globalbuddy.repository.BuddyCrossRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BuddyCrossService {

    private final BuddyCrossRepository buddyCrossRepository;

    public void save(BuddyCrossDto dto) {
        BuddyCrossEntity entity = BuddyCrossEntity.builder()
                .name(dto.getName())
                .generation(dto.getGeneration())
                .score(dto.getScore())
                .build();
        buddyCrossRepository.save(entity);
    }

    public List<BuddyCrossEntity> getAllRanking() {
        return buddyCrossRepository.findAllByOrderByScoreDesc();
    }

    public void update(Long id, int newScore) {
        BuddyCrossEntity entity = buddyCrossRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID가 존재하지 않습니다: " + id));

        entity.setScore(newScore);
        buddyCrossRepository.save(entity);
    }

    public void delete(Long id) {
        buddyCrossRepository.deleteById(id);
    }
}
