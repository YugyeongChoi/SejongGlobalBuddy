package sejong.globalbuddy.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sejong.globalbuddy.entity.BuddyPlusEntity;
import sejong.globalbuddy.repository.BuddyPlusRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BuddyPlusService {
    private final BuddyPlusRepository repo;

    public BuddyPlusEntity save(BuddyPlusEntity entity) {
        return repo.save(entity);
    }

    public List<BuddyPlusEntity> getTop3() {
        return repo.findTop3ByOrderByBingoDesc();
    }

    public List<BuddyPlusEntity> getAllOrderByBingo() {
        return repo.findAllByOrderByBingoDesc();
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
