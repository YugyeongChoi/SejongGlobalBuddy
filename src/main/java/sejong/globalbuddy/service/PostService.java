package sejong.globalbuddy.service;


import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sejong.globalbuddy.dto.PostDto;
import sejong.globalbuddy.entity.PostEntity;
import sejong.globalbuddy.mapper.PostMapper;
import sejong.globalbuddy.repository.PostRepository;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final PostMapper postMapper;

    public PostService(PostRepository postRepository, PostMapper postMapper) {
        this.postRepository = postRepository;
        this.postMapper = postMapper;
    }

    @Transactional(readOnly = true)
    public PostDto getReviewDetail(Long id) throws ChangeSetPersister.NotFoundException {
        PostEntity review = postRepository.findByIdWithPhotos(id)
                .orElseThrow(() -> new ChangeSetPersister.NotFoundException());

        return postMapper.toDto(review);
    }

}

