package sejong.globalbuddy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sejong.globalbuddy.entity.PreviewEntity;

import java.util.List;

public interface PreviewRepository extends JpaRepository<PreviewEntity, Long> {
    List<PreviewEntity> findAllByOrderByPositionAsc();
}
