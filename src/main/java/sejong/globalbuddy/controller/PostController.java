package sejong.globalbuddy.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<?> savePost(@RequestBody PostDto dto) {
        try {
            String password = dto.getPassword();

            // 6자리 숫자가 아닌 경우 예외 처리
            if (!password.matches("^\\d{6}$")) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("Please enter a 6-digit password!");
            }

            PostEntity post = PostEntity.builder()
                    .title(dto.getTitle())
                    .content(dto.getContent())
                    .password(password)
                    .nationality(dto.getNationality())
                    .generation(dto.getGeneration())
                    .nickname(dto.getNickname())
                    .build();

            postRepository.save(post);
            return ResponseEntity.ok("saved");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getPostById(@PathVariable("id") Long id){
        return postRepository.findById(id)
                .map(post -> {
                    PostDto dto = new PostDto();
                    dto.setId(post.getId());
                    dto.setTitle(post.getTitle());
                    dto.setContent(post.getContent());
                    dto.setPassword(post.getPassword());
                    dto.setNationality(post.getNationality());
                    dto.setGeneration(post.getGeneration());
                    dto.setNickname(post.getNickname());
                    dto.setCreatedTime(post.getCreatedTime());
                    return ResponseEntity.ok(dto);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable("id") Long id) {
        postRepository.deleteById(id);
        return ResponseEntity.ok().body("deleted");
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(
            @PathVariable("id") Long id,
            @RequestBody PostDto dto) {

        return postRepository.findById(id)
                .map(existing -> {
                    // 비밀번호 검증
                    if (!existing.getPassword().equals(dto.getPassword())) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body("Incorrect password");
                    }

                    PostEntity updatedPost = PostEntity.builder()
                            .id(existing.getId())  // ⭐ 반드시 ID 설정
                            .title(dto.getTitle())
                            .content(dto.getContent())
                            .password(dto.getPassword())
                            .nationality(dto.getNationality())
                            .generation(dto.getGeneration())
                            .nickname(dto.getNickname())
                            .createdTime(existing.getCreatedTime()) // 원본 시간 보존(Optional)
                            .build();

                    postRepository.save(updatedPost);
                    return ResponseEntity.ok("updated");
                })
                .orElse(ResponseEntity.notFound().build());
    }




}
