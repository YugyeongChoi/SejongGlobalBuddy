package sejong.globalbuddy.service;


import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sejong.globalbuddy.dto.ReviewDto;
import sejong.globalbuddy.entity.ReviewEntity;
import sejong.globalbuddy.mapper.ReviewMapper;
import sejong.globalbuddy.repository.ReviewRepository;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import sejong.globalbuddy.entity.PhotoEntity;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;

    public ReviewService(ReviewRepository reviewRepository, ReviewMapper reviewMapper) {
        this.reviewRepository = reviewRepository;
        this.reviewMapper = reviewMapper;
    }

    @Transactional(readOnly = true)
    public ReviewDto getReviewDetail(Long id) throws ChangeSetPersister.NotFoundException {
        ReviewEntity review = reviewRepository.findByIdWithPhotos(id)
                .orElseThrow(NotFoundException::new);

        ReviewDto dto = reviewMapper.toDto(review);
        dto.setPhotoUrls(
                review.getPhotos().stream()
                        .map(PhotoEntity::getUrl)
                        .collect(Collectors.toList())
        );
        return dto;
    }

}

