package sejong.globalbuddy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sejong.globalbuddy.entity.TeamEntity;

public interface TeamRepository extends JpaRepository<TeamEntity, Long> {
}
