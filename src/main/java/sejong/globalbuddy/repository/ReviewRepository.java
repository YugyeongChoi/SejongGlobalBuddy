package sejong.globalbuddy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import sejong.globalbuddy.entity.ReviewEntity;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {
    @Query("SELECT r FROM ReviewEntity r LEFT JOIN FETCH r.photos WHERE r.id = :id")
    Optional<ReviewEntity> findByIdWithPhotos(@Param("id") Long id);
}
