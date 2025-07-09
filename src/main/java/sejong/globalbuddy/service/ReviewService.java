package sejong.globalbuddy.service;


import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sejong.globalbuddy.dto.ReviewDto;
import sejong.globalbuddy.entity.ReviewEntity;
import sejong.globalbuddy.mapper.ReviewMapper;
import sejong.globalbuddy.repository.ReviewRepository;

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
                .orElseThrow(() -> new ChangeSetPersister.NotFoundException());

        return reviewMapper.toDto(review);
    }

}

