package sejong.globalbuddy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sejong.globalbuddy.entity.PostEntity;

public interface PostRepository extends JpaRepository<PostEntity, Long> {
}
