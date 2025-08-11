package sejong.globalbuddy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sejong.globalbuddy.entity.BuddyPlusEntity;

import java.util.List;

public interface BuddyPlusRepository extends JpaRepository<BuddyPlusEntity, Long> {

    List<BuddyPlusEntity> findAllByOrderByBingoDesc();

    List<BuddyPlusEntity> findTop3ByOrderByBingoDesc();
}
