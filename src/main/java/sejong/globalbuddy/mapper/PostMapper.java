package sejong.globalbuddy.mapper;

import org.springframework.stereotype.Component;
import sejong.globalbuddy.dto.PostDto;
import sejong.globalbuddy.entity.PostEntity;

@Component
public class PostMapper {

    public PostDto toDto(PostEntity post) {
        PostDto dto = new PostDto();
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

    public PostEntity toEntity(PostDto dto) {
        return PostEntity.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .password(dto.getPassword())
                .nationality(dto.getNationality())
                .generation(dto.getGeneration())
                .nickname(dto.getNickname())
                .build();
    }
}
