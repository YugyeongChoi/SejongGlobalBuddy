package sejong.globalbuddy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sejong.globalbuddy.entity.FaqEntity;

import java.util.List;

@Repository
public interface FaqRepository extends JpaRepository<FaqEntity, Long> {
    List<FaqEntity> findByLanguage(String language);
}
