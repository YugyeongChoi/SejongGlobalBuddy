package sejong.globalbuddy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import sejong.globalbuddy.entity.PostEntity;

import java.util.Optional;

public interface PostRepository extends JpaRepository<PostEntity, Long> {
    @Query("SELECT r FROM PostEntity r LEFT JOIN FETCH r.photos WHERE r.id = :id")
    Optional<PostEntity> findByIdWithPhotos(@Param("id") Long id);
}
