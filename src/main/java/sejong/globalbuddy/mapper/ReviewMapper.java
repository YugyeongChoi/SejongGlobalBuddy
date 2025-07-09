package sejong.globalbuddy.mapper;

import org.springframework.stereotype.Component;
import sejong.globalbuddy.dto.ReviewDto;
import sejong.globalbuddy.entity.ReviewEntity;

@Component
public class ReviewMapper {

    public ReviewDto toDto(ReviewEntity post) {
        ReviewDto dto = new ReviewDto();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setContent(post.getContent());
        dto.setPassword(post.getPassword());
        dto.setNationality(post.getNationality());
        dto.setGeneration(post.getGeneration());
        dto.setNickname(post.getNickname());
        dto.setCreatedTime(post.getCreatedTime());
        return dto;
    }

    public ReviewEntity toEntity(ReviewDto dto) {
        return ReviewEntity.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .password(dto.getPassword())
                .nationality(dto.getNationality())
                .generation(dto.getGeneration())
                .nickname(dto.getNickname())
                .build();
    }
}
