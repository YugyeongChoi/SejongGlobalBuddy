package sejong.globalbuddy.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sejong.globalbuddy.dto.ReviewDto;
import sejong.globalbuddy.entity.PhotoEntity;
import sejong.globalbuddy.entity.ReviewEntity;
import sejong.globalbuddy.repository.ReviewRepository;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewRepository reviewRepository;

    @GetMapping
    public List<ReviewEntity> list() {
        return reviewRepository.findAll();
    }

    @PostMapping(value = "/write", consumes = {"multipart/form-data"})
    public ResponseEntity<?> savePostWithPhoto(
            @RequestPart("review") ReviewDto dto,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) {

        try {
            if (!dto.getPassword().matches("^\\d{6}$")) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("Please enter a 6-digit password!");
            }

            ReviewEntity post = ReviewEntity.builder()
                    .title(dto.getTitle())
                    .content(dto.getContent())
                    .password(dto.getPassword())
                    .nationality(dto.getNationality())
                    .generation(dto.getGeneration())
                    .nickname(dto.getNickname())
                    .build();

            // 이미지 저장
            if (images != null) {
                for (MultipartFile image : images) {
                    String uploadDir = System.getProperty("user.dir") + "/src/main/resources/static/uploads/";
                    String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
                    String filePath = uploadDir + fileName;

                    File dest = new File(filePath);
                    dest.getParentFile().mkdirs();
                    image.transferTo(dest);

                    PhotoEntity photo = PhotoEntity.builder()
                            .url("/uploads/" + fileName)
                            .build();

                    post.addPhoto(photo);
                }
            }

            reviewRepository.save(post);
            return ResponseEntity.ok("saved");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<ReviewDto> getPostById(@PathVariable("id") Long id){
        return reviewRepository.findById(id)
                .map(post -> {
                    ReviewDto dto = new ReviewDto();
                    dto.setId(post.getId());
                    dto.setTitle(post.getTitle());
                    dto.setContent(post.getContent());
                    dto.setPassword(post.getPassword());
                    dto.setNationality(post.getNationality());
                    dto.setGeneration(post.getGeneration());
                    dto.setNickname(post.getNickname());
                    dto.setCreatedTime(post.getCreatedTime());

                    if (post.getPhotos() != null) {
                        dto.setPhotoUrls(
                                post.getPhotos().stream()
                                        .map(photo -> photo.getUrl())
                                        .collect(java.util.stream.Collectors.toList())
                        );
                    }

                    return ResponseEntity.ok(dto);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable("id") Long id) {
        reviewRepository.deleteById(id);
        return ResponseEntity.ok().body("deleted");
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(
            @PathVariable("id") Long id,
            @RequestBody ReviewDto dto) {

        return reviewRepository.findById(id)
                .map(existing -> {
                    // 비밀번호 검증
                    if (!existing.getPassword().equals(dto.getPassword())) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body("Incorrect password");
                    }

                    ReviewEntity updatedPost = ReviewEntity.builder()
                            .id(existing.getId())
                            .title(dto.getTitle())
                            .content(dto.getContent())
                            .password(dto.getPassword())
                            .nationality(dto.getNationality())
                            .generation(dto.getGeneration())
                            .nickname(dto.getNickname())
                            .createdTime(existing.getCreatedTime())
                            .build();

                    reviewRepository.save(updatedPost);
                    return ResponseEntity.ok("updated");
                })
                .orElse(ResponseEntity.notFound().build());
    }




}
