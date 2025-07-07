package sejong.globalbuddy.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sejong.globalbuddy.dto.PostDto;
import sejong.globalbuddy.entity.PostEntity;
import sejong.globalbuddy.repository.PostRepository;

import java.util.List;

@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class PostController {

    private final PostRepository postRepository;

    @GetMapping
    public List<PostEntity> list() {
        return postRepository.findAll();
    }

    @PostMapping("/write")
    public ResponseEntity<String> savePost(@RequestBody PostDto dto) {
        PostEntity post = PostEntity.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .password(dto.getPassword())
                .build();

        postRepository.save(post);

        return ResponseEntity.ok("saved");
    }
}
