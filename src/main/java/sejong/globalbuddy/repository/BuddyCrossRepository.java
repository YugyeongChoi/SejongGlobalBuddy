package sejong.globalbuddy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sejong.globalbuddy.entity.BuddyCrossEntity;

import java.util.List;

public interface BuddyCrossRepository extends JpaRepository<BuddyCrossEntity, Long> {
    List<BuddyCrossEntity> findAllByOrderByScoreDesc();
}
